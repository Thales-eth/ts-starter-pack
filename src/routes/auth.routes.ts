import { Router } from "express"
import { getLoggedUser, login, signup } from "@/controllers/auth.controller"
import verifyToken from '@/middleware/verifyToken'
const router = Router()

router.get("/getLoggedUser", verifyToken, getLoggedUser)
router.post("/login", login)
router.post("/signup", signup)

export default router
