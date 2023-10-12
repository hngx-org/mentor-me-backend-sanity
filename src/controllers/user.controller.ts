import { Request, Response } from "express";

import response from "@/utilities/response";
import UserService from "@/services/user.service";

class UserController {
    async getCurrentUser(req: Request, res: Response) {
        const result = await UserService.getCurrentUser({ ...req });
        res.status(200).send(response("user retrieved", result));
    }

    async updateProfile(req: Request, res: Response) {
        const result = await UserService.updateProfile({ ...req });
        res.status(200).send(response("profile updated", result));
    }

    async updatePassword(req: Request, res: Response) {
        const result = await UserService.updatePassword({ ...req });
        res.status(200).send(response("password updated", result));
    }
}

export default new UserController();
