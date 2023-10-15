import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    fullName: string;
    username: string;
    bio?: string;
    image: string;
    email: string;
    password?: string;
    emailVerified: boolean;
    accountDisabled: boolean;
    role: "mentee" | "mentor";
    profileLink: string;
    lastActive: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
    {
        fullName: {
            type: String,
        },
        image: {
            type: String,
        },
        profileLink: {
            type: String,
        },
        username: {
            type: String,
        },
        bio: {
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
