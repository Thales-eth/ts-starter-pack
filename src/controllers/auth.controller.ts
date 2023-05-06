import { Request, Response, NextFunction } from "express";
import { extendedPayloadRequest, UserModel } from '@/types/interfaces'
import User from '@/models/User.model'

export const getLoggedUser = (req: extendedPayloadRequest, res: Response) => {
    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .select("-createdAt -updatedAt -__v")
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

export const login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ err: ["Provide email and password."] });
        return;
    }

    User
        .findOne<UserModel>({ email })
        .then((user: UserModel) => {
            if (!user || !user.comparePassword) {
                res.status(401).json({ err: ["Wrong User or Password"] })
                return
            }

            const authToken = user.signToken()
            res.status(200).json({ authToken })
        })
        .catch(err => next(err))
}

export const signup = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password }: { username: string, email: string, password: string } = req.body

    User
        .create({ username, email, password })
        .then(createdUser => res.status(200).json(createdUser))
        .catch(err => next(err))
}
