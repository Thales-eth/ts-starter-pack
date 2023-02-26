import { Router } from "express"
import { getUsers, getOneUser } from "../controllers/users.controller"

const router = Router()

router.get('/list', getUsers)
router.get('/getOneUser/:id', getOneUser)

export default router