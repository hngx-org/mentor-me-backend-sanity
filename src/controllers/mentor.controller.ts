import { Request, Response } from "express";

import response from "@/utilities/response";
import MentorService from "@/services/mentor.service";

class MentorController {
    async getCurrentMentor(req: Request, res: Response) {
        const result = await MentorService.getCurrentMentor({ ...req });
        res.status(200).send(response("Mentor profile retrieved", result));
    }

    async createProfile(req: Request, res: Response) {
        const result = await MentorService.createMentorProfile({ ...req });
        res.status(200).send(response("Mentor profile created", result));
    }
}

export default new MentorController();