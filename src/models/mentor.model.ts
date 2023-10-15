import mongoose from "mongoose";
import { IUser } from "./user.model";
import { MentorVerificationData } from "@/utilities/constants";

export interface IMentor extends mongoose.Document {
    userProfile: mongoose.Types.ObjectId | IUser;
    yearsOfExp: number;
    skills: string[];
    linkedin: string;
    other_links: string;
    certifications: string;
    certification_file: string;
    degree: string;
    institution: string;
    year_of_graduation: number;
    mentoring_experience: string;
    mentorship_type: string;
    mentorship_availability: string;
    preferred_startTime: string;
    preferred_endTime: string;
    preferred_days: string;
    isVerified?: "Unverified" | "Pending" | "Rejected" | "Verified";
    verificationData?: MentorVerificationData;
}

const mentorSchema: mongoose.Schema<IMentor> = new mongoose.Schema<IMentor>(
    {
        userProfile: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            default: {},
        },
        yearsOfExp: {
            type: Number,
        },
        skills: { type: [String] },
        linkedin: { type: String },
        other_links: { type: String },
        certifications: { type: String },
        certification_file: { type: String },
        degree: { type: String },
        institution: { type: String },
        year_of_graduation: { type: Number },
        mentoring_experience: { type: String },
        mentorship_type: { type: String },
        mentorship_availability: { type: String },
        preferred_startTime: { type: String },
        preferred_endTime: { type: String },
        preferred_days: { type: String },
        isVerified: { type: String, enum: ["Unverified", "Pending", "Rejected", "Verified"], default: "Unverified" },
        verificationData: {
            type: {
                certificates: {
                    certificationName: { type: String },
                    issuingInstitution: { type: String },
                    graduationYear: { type: String },
                    graduationFile: { type: String },
                },
                qualifications: {
                    qualification: { type: String },
                    yearsExperience: { type: String },
                    qualificationDesc: { type: String },
                },
                achievements: {
                    achievementName: { type: String },
                    issuingOrganization: { type: String },
                    yearReceived: { type: String },
                    achievementDesc: { type: String },
                },
                identification: {
                    fullName: { type: String },
                    dateOfBirth: { type: String },
                    idType: { type: String },
                    idNumber: { type: String },
                    uploadID: { type: String },
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

// set mongoose options to have lean turned on by default | ref: https://itnext.io/performance-tips-for-mongodb-mongoose-190732a5d382
mongoose.Query.prototype.setOptions = function () {
    if (this.mongooseOptions().lean == null) {
        this.mongooseOptions({ lean: true });
    }
    return this;
};

export default mongoose.model<IMentor>("mentor", mentorSchema);
