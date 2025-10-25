import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
    userId: string,
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
    userId: {
        type: String,
        default: crypto.randomUUID()
    },
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
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (candidatePassword:string) {
    return  bcrypt.compareSync(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema);