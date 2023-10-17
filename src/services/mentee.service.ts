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

        const mentee = await MenteeModel.findOne({ userProfile: data.$currentUser._id });
        // Check if user exists
        const user = await UserModel.findOne({ _id: data.$currentUser._id });
        if (!user) throw new CustomError("user not found", 404);

        return { ...mentee, user };
    }

    async getAllMentee() {
        return await MenteeModel.find();
    }

    async createMenteeProfile({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                expertise: Joi.string().trim().label("Expertise"),
                fullName: Joi.string().trim().label("Full Name"),
                skill_request: Joi.array().items(Joi.string().trim()).label("Skills"),
                goal: Joi.string().trim().label("Goal"),
                discipline_request: Joi.string().trim().label("Discipline Request"),
                tools_request: Joi.string().trim().label("Tools Request"),
                // skill_request: Joi.string().trim().label("Skill Request"),
                country_request: Joi.string().trim().label("Country Request"),
                country: Joi.string().trim().label("Country"),
                bio: Joi.string().trim().label("Bio"),
                gender: Joi.string().trim().label("Gender"),
                company: Joi.string().trim().label("Company or School"),
                title: Joi.string().trim().label("Title"),
                image: Joi.string().trim().label("Image"),
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

        const context = {
            expertise: data.body.fullName,
            goal: data.body.goal,
            discipline_request: data.body.discipline_request,
            tools_request: data.body.tools_request,
            skill_request: data.body.skill_request,
            country_request: data.body.country,
            country: data.body.Country,
            gender: data.body.gender,
            company: data.body.company,
            title: data.body.title,
        };

        const userForm = {
            bio: data.body.bio,
            image: data.body.image,
            fullName: data.body.fullName,
        };

        // Create new mentee profile
        const mentee = await new MenteeModel({ userProfile: user, ...context }).save();

        //   update user data with profile id
        const userDetails = await UserModel.updateOne({ _id: user._id }, { $set: { profileLink: mentee._id, updatedAt: Date.now(), ...userForm } });

        return { ...mentee, userDetails };
    }

    async updateMenteeProfile({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                expertise: Joi.string().trim().label("Expertise"),
                fullName: Joi.string().trim().label("Full Name"),
                goal: Joi.string().trim().label("Goal"),
                discipline_request: Joi.string().trim().label("Discipline Request"),
                tools_request: Joi.string().trim().label("Tools Request"),
                skill_request: Joi.array().items(Joi.string().trim()).label("Skills"),
                // skill_request: Joi.string().trim().label("Skill Request"),
                country_request: Joi.string().trim().label("Country Request"),
                country: Joi.string().trim().label("Country"),
                bio: Joi.string().trim().label("Bio"),
                gender: Joi.string().trim().label("Gender"),
                company: Joi.string().trim().label("Company or School"),
                title: Joi.string().trim().label("Title"),
                image: Joi.string().trim().label("Image"),
            }),
            $currentUser: Joi.object({
                _id: Joi.required(),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body, $currentUser });
        if (error) throw new CustomError(error.message, 400);

        const context = {
            expertise: data.body.fullName,
            goal: data.body.goal,
            discipline_request: data.body.discipline_request,
            tools_request: data.body.tools_request,
            skill_request: data.body.skill_request,
            country_request: data.body.country,
            country: data.body.Country,
            gender: data.body.gender,
            company: data.body.company,
            title: data.body.title,
        };

        const userData = {
            bio: data.body.bio,
            image: data.body.image,
            fullName: data.body.fullName,
        };

        // Check if user exists
        const user = await UserModel.findOne({ _id: data.$currentUser._id });
        if (!user) throw new CustomError("user not found", 404);

        // Check if mentor exists
        const mentee = await MenteeModel.findOneAndUpdate({ userProfile: data.$currentUser._id }, { $set: { ...context, updatedAt: Date.now() } }, { new: true });
        if (!mentee) throw new CustomError("mentee profile not found", 404);

        //   update user data with profile id
        const userDetails = await UserModel.updateOne({ _id: user._id }, { $set: { profileLink: mentee._id, updatedAt: Date.now(), ...userData } });

        return { ...mentee, userDetails };
    }
}

export default new MenteeService();
