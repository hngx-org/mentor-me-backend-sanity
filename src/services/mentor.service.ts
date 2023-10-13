import Joi from "joi";
import { Request } from "express";

import MentorModel from "@/models/mentors.model";
import UserModel from "@/models/user.model";
import CustomError from "@/utilities/custom-error";

class UserService {
    async getCurrentMentor({ $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            $currentUser: Joi.object({
                _id: Joi.required(),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ $currentUser });
        if (error) throw new CustomError(error.message, 400);

        return await MentorModel.findOne({ userProfile: data.$currentUser._id });
    }

    async createMentorProfile({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                yearsOfExp: Joi.number().required().label("Years of Experience"),
                skills: Joi.string().trim().required().label("Skills"),
                linkedin: Joi.string().trim().required().label("LinkedIn"),
                other_links: Joi.string().trim().required().label("Other Links"),
                certifications: Joi.string().trim().required().label("Certifications"),
                certification_file: Joi.string().trim().required().label("Certification File"),
                degree: Joi.string().trim().required().label("Degree"),
                institution: Joi.string().trim().required().label("Institution"),
                year_of_graduation: Joi.number().required().label("Year of Graduation"),
                mentoring_experience: Joi.string().trim().required().label("Mentoring Experience"),
                mentorship_type: Joi.string().trim().required().label("Mentorship Type"),
                mentorship_availability: Joi.string().trim().required().label("Mentorship Availability"),
                preferred_startTime: Joi.string().trim().required().label("Preferred Start Time"),
                preferred_endTime: Joi.string().trim().required().label("Preferred End Time"),
                preferred_days: Joi.string().trim().required().label("Preferred Days"),
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

        // Create new mentor profile
        const mentor = await new MentorModel({ userProfile: user, ...data.body }).save();

        //   update user data with profile id
        await UserModel.updateOne({ _id: user._id }, { $set: { profileLink: mentor._id, updatedAt: Date.now() } });

        return mentor;
    }
}

export default new UserService();