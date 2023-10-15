import Joi from "joi";
import { Request } from "express";

import MentorModel from "@/models/mentor.model";
import UserModel from "@/models/user.model";
import CustomError from "@/utilities/custom-error";

class MentorService {
    async getCurrentMentor({ $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            $currentUser: Joi.object({
                _id: Joi.required(),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ $currentUser });
        if (error) throw new CustomError(error.message, 400);

        const mentor = await MentorModel.findOne({ userProfile: data.$currentUser._id });
        const userDetails = await UserModel.findOne({ _id: data.$currentUser._id });
        return { ...mentor, userDetails };
    }

    async getAllMentors() {
        return await MentorModel.find();
    }

    async createMentorProfile({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                fullName: Joi.string().trim().required().label("Full Name"),
                bio: Joi.string().trim().required().label("Bio"),
                image: Joi.number().label("Image"),
                yearsOfExp: Joi.number().required().label("Years of Experience"),
                // skills: Joi.array().items(Joi.string().trim()).label("Skills"),
                skills: Joi.string().trim().required().label("skills"),
                expertise: Joi.string().trim().label("expertise"),
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

        const context = {
            yearsOfExp: data.body.yearsOfExp,
            skills: data.body.skills,
            linkedin: data.body.linkedIn,
            other_links: data.body.other_links,
            certifications: data.body.certifications,
            certification_file: data.body.certification_file,
            degree: data.body.degree,
            institution: data.body.institution,
            year_of_graduation: data.body.year_of_graduation,
            mentoring_experience: data.body.mentoring_experience,
            mentorship_type: data.body.mentorship_type,
            mentorship_availability: data.body.mentorship_availability,
            preferred_startTime: data.body.preferred_startTime,
            preferred_endTime: data.body.preferred_endTime,
            preferred_days: data.body.preferred_days,
            expertise: data.body.expertise,
        };

        // Create new mentor profile
        const mentor = await new MentorModel({ userProfile: user, ...context }).save();

        const userContext = {
            fullName: data.body.fullName,
            bio: data.body.bio,
            image: data.body.image,
        };

        //   update user data with profile id
        const newUser = await UserModel.updateOne({ _id: user._id }, { $set: { profileLink: mentor._id, updatedAt: Date.now(), ...userContext } });

        return { ...mentor, newUser };
    }

    async updateMentorProfile({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                fullName: Joi.string().trim().label("Full Name"),
                bio: Joi.string().trim().label("Bio"),
                image: Joi.number().label("Image"),
                yearsOfExp: Joi.number().label("Years of Experience"),
                // skills: Joi.array().items(Joi.string().trim()).label("Skills"),
                skills: Joi.string().trim().label("skills"),
                expertise: Joi.string().trim().label("expertise"),
                linkedin: Joi.string().trim().label("LinkedIn"),
                other_links: Joi.string().trim().label("Other Links"),
                certifications: Joi.string().trim().label("Certifications"),
                certification_file: Joi.string().trim().label("Certification File"),
                degree: Joi.string().trim().label("Degree"),
                institution: Joi.string().trim().label("Institution"),
                year_of_graduation: Joi.number().label("Year of Graduation"),
                mentoring_experience: Joi.string().trim().label("Mentoring Experience"),
                mentorship_type: Joi.string().trim().label("Mentorship Type"),
                mentorship_availability: Joi.string().trim().label("Mentorship Availability"),
                preferred_startTime: Joi.string().trim().label("Preferred Start Time"),
                preferred_endTime: Joi.string().trim().label("Preferred End Time"),
                preferred_days: Joi.string().trim().label("Preferred Days"),
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

        const context = {
            yearsOfExp: data.body.yearsOfExp,
            skills: data.body.skills,
            linkedin: data.body.linkedIn,
            other_links: data.body.other_links,
            certifications: data.body.certifications,
            certification_file: data.body.certification_file,
            degree: data.body.degree,
            institution: data.body.institution,
            year_of_graduation: data.body.year_of_graduation,
            mentoring_experience: data.body.mentoring_experience,
            mentorship_type: data.body.mentorship_type,
            mentorship_availability: data.body.mentorship_availability,
            preferred_startTime: data.body.preferred_startTime,
            preferred_endTime: data.body.preferred_endTime,
            preferred_days: data.body.preferred_days,
            expertise: data.body.expertise,
        };

        const userContext = {
            fullName: data.body.fullName,
            bio: data.body.bio,
            image: data.body.image,
        };

        // Check if mentor exists
        const mentor = await MentorModel.findOneAndUpdate({ userProfile: data.$currentUser._id }, { $set: { ...context, updatedAt: Date.now() } }, { new: true });
        if (!mentor) throw new CustomError("mentor profile not found", 404);

        //   update user data with profile id
        const userDetails = await UserModel.updateOne({ _id: user._id }, { $set: { profileLink: mentor._id, updatedAt: Date.now(), ...userContext } });

        return { ...mentor, userDetails };
    }

    async verifyMentor({ body, $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                certificates: Joi.object({
                    certificationName: Joi.string().required().label("Certification Name"),
                    issuingInstitution: Joi.string().required().label("Issuing Institution"),
                    graduationYear: Joi.string().required().label("Graduation Year"),
                    graduationFile: Joi.string().required().label("Graduation File"),
                })
                    .required()
                    .label("Certificates"),

                qualifications: Joi.object({
                    qualification: Joi.string().required().label("Qualification"),
                    yearsExperience: Joi.string().required().label("Years of Experience"),
                    qualificationDesc: Joi.string().required().label("Qualification Description"),
                })
                    .required()
                    .label("Qualifications"),

                achievements: Joi.object({
                    achievementName: Joi.string().required().label("Achievement Name"),
                    issuingOrganization: Joi.string().required().label("Issuing Organization"),
                    yearReceived: Joi.string().required().label("Year Received"),
                    achievementDesc: Joi.string().required().label("Achievement Description"),
                })
                    .required()
                    .label("Achievements"),

                identification: Joi.object({
                    fullName: Joi.string().required().label("Full Name"),
                    dateOfBirth: Joi.string().required().label("Date of Birth"),
                    idType: Joi.string().required().label("ID Type"),
                    idNumber: Joi.string().required().label("ID Number"),
                    uploadID: Joi.string().required().label("Upload ID"),
                })
                    .required()
                    .label("Identification"),
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
        const mentor = await MentorModel.findOneAndUpdate({ userProfile: data.$currentUser._id }, { $set: { verificationData: { ...data.body }, isVerified: "Pending", updatedAt: Date.now() } }, { new: true });
        if (!mentor) throw new CustomError("mentor profile not found", 404);

        return mentor;
    }
}

export default new MentorService();
