import { Application, ErrorRequestHandler } from "express";

export default (app: Application) => {
    app.use((_req, res) => {
        res.status(404).json({ message: "This route does not exist" });
        return
    });

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        console.error("ERROR", req.method, req.path, err)

        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0]
            const value = err.keyValue[field]
            const errorMessage: String = `${field} ${value} already in use!`
            res.status(409).json({ err: [errorMessage] })
            return
        }

        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(({ message }) => message)
            res.status(400).json({ err: errors })
            return
        }

        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error. Check the server console" })
            return
        }

        next(err);
    };

    app.use(errorHandler)
};
