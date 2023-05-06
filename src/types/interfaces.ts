import { Request } from "express";
import { Document } from "mongoose"

export interface extendedPayloadRequest extends Request {
    payload: {
        _id: string;
    }
}

export interface UserModel extends Document {
    signToken: () => string;
    comparePassword: (plainPwd: string) => boolean
    username: string;
    email: string;
    password: string;
    avatar: string;
}