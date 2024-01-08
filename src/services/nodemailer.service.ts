import { transporter } from "@/config/nodemailer.config"
import handlebars from "handlebars"

export const sendNodemailerMail = (
  content: string,
  mailsList: { name: string; email: string }[]
) => {
  for (const { name, email } of mailsList) {
    const source = content
    const template = handlebars.compile(source)
    const html = template({ name })
    const mailOptions = {
      from: "nodemailer.tailor.test@gmail.com",
      to: email,
      subject: `Figma Plugin Test V.0 ${name}`,
      html,
    }

    transporter.sendMail(mailOptions, (err: any, data: any) => {
      if (err) console.log("ERR ===>", err)
      console.log("success!")
      return data
    })
  }
}
