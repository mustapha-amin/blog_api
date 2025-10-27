import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
    email: string,
    password: string,
    username: string,
    comparePassword(candidatePassword: string): Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    refreshTokens: string []
}

export const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        sparse: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    refreshTokens: [String]
}, {
    timestamps: true
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (candidatePassword:string) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema);