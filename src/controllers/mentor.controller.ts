import { Request, Response } from "express";

import response from "@/utilities/response";
import MentorService from "@/services/mentor.service";

class MentorController {
    async createProfile(req: Request, res: Response) {
        const result = await MentorService.createMentorProfile({ ...req });
        res.status(200).send(response("Mentor profile created", result));
    }
}

export default new MentorController();
