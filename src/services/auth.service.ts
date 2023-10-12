import Joi from "joi";
import bcryptjs from "bcryptjs";
import { Request } from "express";
import { CONFIGS } from "@/configs";

import UserModel from "@/models/user.model";
import mailService from "@/services/mail.service";
import CustomError from "@/utilities/custom-error";
import TokenService from "@/services/token.service";

class AuthService {
    async register({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                email: Joi.string().trim().email().required().label("email"),
                password: Joi.string().required().label("password"),
                role: Joi.valid("mentee", "mentor").required().label("role"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        const emailExist = await UserModel.findOne({ email: data.body.email });
        if (emailExist) throw new CustomError("email already exists", 400);

        const passwordHash = await bcryptjs.hash(data.body.password, CONFIGS.BCRYPT_SALT);

        const context = {
            email: data.body.email,
            password: passwordHash,
        };

        // Create new user
        const user = await new UserModel(context).save();

        // Generate token
        // const token = await TokenService.generateAuthTokens({ _id: user._id, role: user.role, email: user.email });

        // Send email verification
        await this.requestEmailVerification(user._id, true);

        // Remove password from response
        delete user.password;

        return user;
    }

    async login({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                email: Joi.string().trim().email().required().label("email"),
                password: Joi.string().required().label("password"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        // Check if email exists
        const user = await UserModel.findOne({ email: data.body.email }).select("+password");
        if (!user) throw new CustomError("incorrect email or password", 400);

        // Check if password is correct
        const validPassword = await bcryptjs.compare(data.body.password, user.password || "");
        if (!validPassword) throw new CustomError("incorrect email or password", 400);

        // check if account is disabled
        if (user.accountDisabled === true) throw new CustomError("account has been disabled, kindly contact support", 409);

        // if account is not verified

        if (!user.emailVerified) {
            // Send email verification
            await this.requestEmailVerification(user._id, false);
            // Remove password from response
            delete user.password;
            throw new CustomError("verification code sent to email", 406, user);
        }

        // Generate token
        const token = await TokenService.generateAuthTokens({ _id: user._id, role: user.role, email: user.email });

        // update last active
        await UserModel.updateOne({ _id: user._id }, { $set: { lastActive: Date.now() } });

        // Remove password from response
        delete user.password;

        return { user, token };
    }

    async verifyEmail({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                userId: Joi.string().required().label("user id"),
                // verificationToken is required if code is not provided
                verificationToken: Joi.string().trim().label("verification token"),
                // verificationCode is required if token is not provided
                verificationCode: Joi.string().trim().label("verification code"),
            }).xor("verificationToken", "verificationCode"),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        // Check if user exists
        const user = await UserModel.findOne({ _id: data.body.userId });
        if (!user) throw new CustomError("user does not exist", 400);

        // Check if email is already verified
        if (user.emailVerified) throw new CustomError("email is already verified", 400);

        const isValidToken = await TokenService.verifyToken({ token: data.body.verificationToken, code: data.body.verificationCode, userId: user._id, tokenType: "email-verification" });
        if (!isValidToken) throw new CustomError("invalid or expired token. Kindly request a new verification link", 400);

        // Update user
        await UserModel.updateOne({ _id: user._id }, { $set: { emailVerified: true, updatedAt: Date.now() } });

        return;
    }

    async requestEmailVerification(userId: string, isNewUser: boolean) {
        const { error, value: data } = Joi.object({
            userId: Joi.required().label("user id"),
            isNewUser: Joi.boolean().required(),
        })
            .options({ stripUnknown: true })
            .validate({ userId, isNewUser });
        if (error) throw new CustomError(error.message, 400);

        // Check if user exists
        const user = await UserModel.findOne({ _id: data.userId });
        if (!user) throw new CustomError("user does not exist", 400);

        // Check if email is already verified
        if (user.emailVerified) throw new CustomError("email is already verified", 400);

        // Create new token
        const verificationToken = await TokenService.generateToken({ userId: user._id, tokenType: "email-verification" });

        if (isNewUser) {
            // send welcome user email
            await mailService.sendWelcomeUserEmail({ user, verificationToken: verificationToken.code });
        } else {
            // send new verification link email
            await mailService.sendVerificationLinkEmail({ user, verificationToken: verificationToken.code });
        }

        return;
    }

    async requestPasswordReset({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                email: Joi.string().trim().email().required().label("email"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        // Check if email exists by a user
        const user = await UserModel.findOne({ email: data.body.email });
        // Don't throw error if user doesn't exist, just return null - so hackers don't exploit this route to know emails on the platform
        if (!user) return;

        const resetToken = await TokenService.generateToken({ userId: user._id, tokenType: "password-reset" });

        // send password reset email
        await mailService.sendPasswordResetEmail({ user, resetToken: resetToken.token });

        return;
    }

    async resetPassword({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                userId: Joi.string().required().label("user id"),
                resetToken: Joi.string().required().label("reset token"),
                newPassword: Joi.string().required().label("new password"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        // Check if user exists
        const user = await UserModel.findOne({ _id: data.body.userId });
        if (!user) throw new CustomError("user does not exist", 400);

        const isValidToken = await TokenService.verifyToken({ token: data.body.resetToken, userId: user._id, tokenType: "password-reset" });
        if (!isValidToken) throw new CustomError("invalid or expired token. Kindly make a new password reset request", 400);

        // Hash new password and update user
        const passwordHash = await bcryptjs.hash(data.body.newPassword, CONFIGS.BCRYPT_SALT);
        await UserModel.updateOne({ _id: user._id }, { $set: { password: passwordHash } });

        return;
    }
}

export default new AuthService();
