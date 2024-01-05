import { sendEmail } from "@/controllers/nodemailer.controller"
import { Router } from "express"
const router = Router()

router.post("/send", sendEmail)

export default router
