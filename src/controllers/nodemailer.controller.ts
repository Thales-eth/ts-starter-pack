import { sendNodemailerMail } from "@/services/nodemailer.service"
import { NextFunction, Request, Response } from "express"

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    await sendNodemailerMail(email)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}
