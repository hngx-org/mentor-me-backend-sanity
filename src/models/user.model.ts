import mongoose from "mongoose";
import { MenteeDetails, MentorDetails } from "@/utilities/constants";

export interface IUser extends mongoose.Document {
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    emailVerified: boolean;
    accountDisabled: boolean;
    role: "mentee" | "mentor";
    lastActive: Date;
    createdAt?: Date;
    updatedAt?: Date;
    userDetails?: MentorDetails | MenteeDetails;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
    {
        firstName: {
            type: String,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },

        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        accountDisabled: {
            type: Boolean,
            required: true,
            default: false,
        },

        role: {
            type: String,
            required: true,
            enum: ["mentee", "mentor"],
            default: "mentor",
        },

        userDetails: { type: Object },

        lastActive: {
            type: Date,
            required: true,
            default: Date.now,
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

export default mongoose.model<IUser>("user", userSchema);
