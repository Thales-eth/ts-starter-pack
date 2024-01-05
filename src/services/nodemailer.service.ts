import { transporter } from "@/config/nodemailer.config"

export const sendNodemailerMail = (email: string) => {
  const mailOptions = {
    from: "nodemailer.tailor.test@gmail.com",
    to: "dan.jimenez@tailor-hub.com",
    subject: "Figma Plugin Test",
    text: email,
    html: email,
  }

  // tipar err/data
  transporter.sendMail(mailOptions, (err: any, data: any) => {
    if (err) console.log("ERR ===>", err)
    console.log("success!")
    return data
  })
}
