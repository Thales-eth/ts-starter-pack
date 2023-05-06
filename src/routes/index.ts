import { Router } from "express";
const router = Router();
import userRoutes from './user.routes'
import authRoutes from './auth.routes'

router.use("/users", userRoutes);
router.use("/auth", authRoutes)

export default router