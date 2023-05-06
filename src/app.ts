import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express();
import "./db"

import config from './config';
config(app);

import indexRoutes from "./routes/index";
app.use("/api", indexRoutes);

import errorHandler from './error-handling'
errorHandler(app)

export default app;