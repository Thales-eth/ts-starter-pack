import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: "10mb" }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))

import config from "./config"
config(app)

import indexRoutes from "./routes/index"
app.use("/api", indexRoutes)

import errorHandler from "./error-handling"
errorHandler(app)

export default app
