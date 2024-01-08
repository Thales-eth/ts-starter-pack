import { sendNodemailerMail } from "@/services/nodemailer.service"
import { NextFunction, Request, Response } from "express"
import { minify } from "html-minifier"

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, mailsList } = req.body
    // Minificar contenido cuando no haya errores en el HTML
    // const minifiedMailContent = minify(content, {
    //   removeAttributeQuotes: true,
    //   collapseWhitespace: true,
    //   minifyCSS: true,
    //   minifyURLs: true,
    //   removeComments: true,
    // })
    await sendNodemailerMail(content, mailsList)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}
