import {z} from "zod";

export const registerSchema = z.object({
    email: z
        .email({message:"invalid email"}),
    password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {message:"Invalid password"}),
    username: z.string({message:"invalid username"})
});