import User from '../models/User.model'
import mongoose from 'mongoose';
import { Types } from 'mongoose'

import '../db'

interface UserInterface {
    username: string,
    email: string,
    password: number,
    avatar?: string,
    friends?: Types.ObjectId[];
    personalPhotos?: Types.ObjectId[];
    favoritePhotos?: Types.ObjectId[];
}

const popino: UserInterface = {
    username: "Popino",
    email: "popino@gmail.com",
    password: 1234,
}

User
    .create(popino)
    .then((user): void => console.log(`ENHORABUENA, TU PRIMER USUARIO EN TS, DANI: ${user}`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())