import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface IMentee extends mongoose.Document {
    userProfile: mongoose.Types.ObjectId | IUser;
    expertise: string;
    discipline_request: string;
    tools_request: string;
    skill_request: string[];
    country_request: string;
    goal: string;
    country: string;
    gender: string;
    company: string;
    title: string;
}

const menteeSchema: mongoose.Schema<IMentee> = new mongoose.Schema<IMentee>(
    {
        userProfile: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            default: {},
        },
        expertise: { type: String },
        goal: { type: String },
        discipline_request: { type: String },
        tools_request: { type: String },
        skill_request: { type: [String] },
        country_request: { type: String },
        country: { type: String },
        gender: { type: String },
        company: { type: String },
        title: { type: String },
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

export default mongoose.model<IMentee>("mentee", menteeSchema);
