import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL;
export const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
export const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN
export const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN;