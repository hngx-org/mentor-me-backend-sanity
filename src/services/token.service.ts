import crypto from "crypto";
import JWT from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { CONFIGS } from "@/configs";
import { IUser } from "@/models/user.model";
import TokenModel, { IToken } from "@/models/token.model";

class TokenService {
    async generateAuthTokens(user: Pick<IUser, "_id" | "role" | "email">) {
        // Generate access token JWT
        const accessToken = JWT.sign({ _id: user._id, role: user.role, email: user.email }, CONFIGS.JWT_SECRET, { expiresIn: CONFIGS.ACCESS_TOKEN_JWT_EXPIRES_IN / 1000 });

        return accessToken;
    }

    async generateToken({ userId, tokenType }: { userId: string; tokenType: Exclude<IToken["type"], "refresh-token"> }) {
        // find and delete any existing token
        await TokenModel.findOneAndDelete({ userId: userId, type: tokenType });

        // Generate random code and token
        const code = crypto.randomBytes(3).toString("hex").toUpperCase();
        const token = crypto.randomBytes(32).toString("hex");

        // encrypt the generated code and token
        const hashedCode = await bcryptjs.hash(code, CONFIGS.BCRYPT_SALT);
        const hashedToken = await bcryptjs.hash(token, CONFIGS.BCRYPT_SALT);

        // Save the encrypted code and token in database
        await new TokenModel({ code: hashedCode, token: hashedToken, type: tokenType, userId: userId, expiresAt: Date.now() + CONFIGS.DEFAULT_DB_TOKEN_EXPIRY_DURATION }).save();

        // Return the unencrypted code and token
        return { code, token };
    }

    async verifyToken({ code, token, userId, tokenType }: { code?: string; token?: string; userId: string; tokenType: IToken["type"] }) {
        // Find token in database
        const dbToken = await TokenModel.findOne({ userId: userId, type: tokenType });

        // If no token found, return false
        if (!dbToken) return false;

        // Check if code and token matches
        const isCodeValid = await bcryptjs.compare(String(code), String(dbToken.code));
        const isTokenValid = await bcryptjs.compare(String(token), String(dbToken.token));

        // If code and token is invalid, return false
        if (!isCodeValid && !isTokenValid) return false;

        // If code and token is valid, delete the token
        await TokenModel.deleteOne({ userId: userId, type: tokenType });

        return true;
    }
}

export default new TokenService();
