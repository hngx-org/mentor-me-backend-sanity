import { Request, Response } from "express";

import response from "@/utilities/response";
import MentorService from "@/services/mentor.service";

class MentorController {
    async getCurrentMentor(req: Request, res: Response) {
        const result = await MentorService.getCurrentMentor({ ...req });
        res.status(200).send(response("Mentor profile retrieved", result));
    }

    async getAllMentors(_req: Request, res: Response) {
        const result = await MentorService.getAllMentors();
        res.status(200).send(response("All mentors fetch", result));
    }

    async createProfile(req: Request, res: Response) {
        const result = await MentorService.createMentorProfile({ ...req });
        res.status(200).send(response("Mentor profile created", result));
    }

    async updateProfile(req: Request, res: Response) {
        const result = await MentorService.updateMentorProfile({ ...req });
        res.status(200).send(response("Mentor profile updated", result));
    }

    async verifyProfile(req: Request, res: Response) {
        const result = await MentorService.verifyMentor({ ...req });
        res.status(200).send(response("Details Received", result));
    }

    async getAMentor(req: Request, res: Response) {
        const result = await MentorService.getMentor({ ...req });
        res.status(200).send(response("Mentor data fetched", result));
    }
}

export default new MentorController();
