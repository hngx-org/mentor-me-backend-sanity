import { CONFIGS } from "@/configs";
import { sendMail } from "@/libraries/mailer";
import { IUser } from "@/models/user.model";
import { render } from "@react-email/components";

import WelcomeUserEmail from "@/email-templates/welcome-user";
import VerificationLinkEmail from "@/email-templates/verification-link";
import PasswordResetEmail from "@/email-templates/password-reset";

class MailService {
    async sendWelcomeUserEmail(context: { user: Pick<IUser, "_id" | "fullName" | "email">; verificationToken: string }) {
        const emailProp = {
            fullName: context.user.fullName,
            verificationCode: context.verificationToken,
        };

        return await sendMail({
            to: context.user.email,
            subject: "Welcome to mentorMe",
            text: render(WelcomeUserEmail(emailProp), { plainText: true }),
            html: render(WelcomeUserEmail(emailProp)),
        });
    }

    async sendVerificationLinkEmail(context: { user: Pick<IUser, "_id" | "fullName" | "email">; verificationToken: string }) {
        const emailProp = {
            fullName: context.user.fullName,
            verificationCode: context.verificationToken,
        };

        return await sendMail({
            to: context.user.email,
            subject: "Verify your email address",
            text: render(VerificationLinkEmail(emailProp), { plainText: true }),
            html: render(VerificationLinkEmail(emailProp)),
        });
    }

    async sendPasswordResetEmail(context: { user: Pick<IUser, "_id" | "fullName" | "email">; resetToken: string }) {
        const emailProp = {
            fullName: context.user.fullName,
            resetLink: `${CONFIGS.URL.AUTH_BASE_URL}/reset-password?resetToken=${context.resetToken}&userId=${context.user._id}`,
        };

        return await sendMail({
            to: context.user.email,
            subject: "Reset your password",
            text: render(PasswordResetEmail(emailProp), { plainText: true }),
            html: render(PasswordResetEmail(emailProp)),
        });
    }
}

// For testing purposes, uncomment code below and run `yarn start`
// new MailService().sendWelcomeUserEmail({
//     user: {
//         _id: "5f9b3b1b9b3b1b9b3b1b9b3b",
//         fullName: "John",
//         email: "", // Add your email here to test
//     },
//     verificationToken: "5f9b3b1b9b3b1b9b3b1b9b3b",
// });

export default new MailService();
