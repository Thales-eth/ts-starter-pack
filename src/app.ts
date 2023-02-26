import express from "express";
// DOTENV CONFIG
import dotenv from "dotenv"
dotenv.config()

// Create Express server
const app = express();

// Importar Base de Datos
import "./db"

// Configuración
import config from './config';
config(app);

// Routes
import indexRoutes from "./routes/index";
app.use("/api", indexRoutes);

// Manejo de errores
import errorHandler from './error-handling'
errorHandler(app)

export default app;