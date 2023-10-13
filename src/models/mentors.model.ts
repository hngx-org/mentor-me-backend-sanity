import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface IMentor extends mongoose.Document {
    userProfile: mongoose.Types.ObjectId | IUser;
    yearsOfExp: number;
    skills: string;
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
        skills: { type: String },
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
