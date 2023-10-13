import { Request, Response } from "express";

import response from "@/utilities/response";
import MenteeService from "@/services/mentee.service";

class MenteeController {
    async getCurrentMentee(req: Request, res: Response) {
        const result = await MenteeService.getCurrentMentee({ ...req });
        res.status(200).send(response("Mentee profile retrieved", result));
    }

    async getAllMentee(_req: Request, res: Response) {
        const result = await MenteeService.getAllMentee();
        res.status(200).send(response("All mentee fetch", result));
    }

    async createProfile(req: Request, res: Response) {
        const result = await MenteeService.createMenteeProfile({ ...req });
        res.status(200).send(response("Mentee profile created", result));
    }

    async updateProfile(req: Request, res: Response) {
        const result = await MenteeService.updateMenteeProfile({ ...req });
        res.status(200).send(response("Mentee profile updated", result));
    }
}

export default new MenteeController();
