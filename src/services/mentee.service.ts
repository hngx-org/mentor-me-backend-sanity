import Joi from "joi";
import { Request } from "express";

import MenteeModel from "@/models/mentee.model";
import UserModel from "@/models/user.model";
import CustomError from "@/utilities/custom-error";

class MenteeService {
    async getCurrentMentee({ $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            $currentUser: Joi.object({
                _id: Joi.required(),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ $currentUser });
        if (error) throw new CustomError(error.message, 400);

        return await MenteeModel.findOne({ userProfile: data.$currentUser._id });
    }

    async getAllMentee() {
        return await MenteeModel.find();
    }

    async createMenteeProfile({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                expertise: Joi.string().trim().label("Expertise"),
                goal: Joi.array().items(Joi.string().trim()).label("Goal"),
                discipline_request: Joi.string().trim().label("Discipline Request"),
                tools_request: Joi.string().trim().label("Tools Request"),
                skill_request: Joi.string().trim().label("Skill Request"),
                country_request: Joi.string().trim().label("Country Request"),
            }),
            $currentUser: Joi.object({
                _id: Joi.required(),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body, $currentUser });
        if (error) throw new CustomError(error.message, 400);

        // Check if user exists
        const user = await UserModel.findOne({ _id: data.$currentUser._id });
        if (!user) throw new CustomError("user not found", 404);

        // check if user already has a profile
        if (user.profileLink) throw new CustomError("user already have a profile", 400);

        // Create new mentee profile
        const mentee = await new MenteeModel({ userProfile: user, ...data.body }).save();

        //   update user data with profile id
        await UserModel.updateOne({ _id: user._id }, { $set: { profileLink: mentee._id, updatedAt: Date.now() } });

        return mentee;
    }

    async updateMenteeProfile({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                expertise: Joi.string().trim().label("Expertise"),
                goal: Joi.array().items(Joi.string().trim()).label("Goal"),
                discipline_request: Joi.string().trim().label("Discipline Request"),
                tools_request: Joi.string().trim().label("Tools Request"),
                skill_request: Joi.string().trim().label("Skill Request"),
                country_request: Joi.string().trim().label("Country Request"),
            }),
            $currentUser: Joi.object({
                _id: Joi.required(),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body, $currentUser });
        if (error) throw new CustomError(error.message, 400);

        // Check if user exists
        const user = await UserModel.findOne({ _id: data.$currentUser._id });
        if (!user) throw new CustomError("user not found", 404);

        // Check if mentor exists
        const mentee = await MenteeModel.findOneAndUpdate({ userProfile: data.$currentUser._id }, { $set: { ...data.body, updatedAt: Date.now() } }, { new: true });
        if (!mentee) throw new CustomError("mentee profile not found", 404);

        return mentee;
    }
}

export default new MenteeService();
