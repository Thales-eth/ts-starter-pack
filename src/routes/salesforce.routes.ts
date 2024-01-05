import {
  createAsset,
  createAuthToken,
  createDefinition,
  deleteAsset,
  getAsset,
  getDefinition,
  sendEmail,
} from "@/controllers/salesforce.controller"
import { Router } from "express"

const router = Router()

router.get("/asset/:id", getAsset)
router.get("/definition/:key", getDefinition)
router.post("/token", createAuthToken)
router.post("/asset", createAsset)
router.post("/definition", createDefinition)
router.post("/sendEmail/:id", sendEmail)
router.delete("/asset/:id", deleteAsset)

export default router
