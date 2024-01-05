import { Router } from "express"
import salesforceRoutes from "./salesforce.routes"
import nodemailerRoutes from "./nodemailer.routes"
const router = Router()

router.use("/salesforce", salesforceRoutes)
router.use("/nodemailer", nodemailerRoutes)

export default router
