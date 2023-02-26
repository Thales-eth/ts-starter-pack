import { Request, Response } from "express";
import UserModel from '../models/User.model'

export const getUsers = (_req: Request, res: Response): void => {
    UserModel
        .find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
};

export const getOneUser = (req: Request, res: Response): void => {
    const { id } = req.params

    res.send(`EL AMIGOOOOO CON ID ${id}`)
}

