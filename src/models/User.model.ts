import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { Schema, model } from "mongoose";
const saltRounds: number = +process.env.SALT

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "A username is needed!"],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, "An email is needed"],
            unique: true,
            minLength: 1,
            lowercase: true,
            trim: true,
            match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                "Choose a valid email"
            ]
        },
        password: {
            type: String,
            required: [true, "A password is needed!"],
            minLength: [1, "Password too short"]
            // match: [/^(?=.*[0-9]).{8,}$/, "Password must be 8 characters long and contain at least one number"]
        },
        avatar: {
            type: String,
            default: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80",
            set: (value: string) => !value ?
                "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80"
                :
                value
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {

    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()
    }
    catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = function (plainPwd: string) {
    return bcrypt.compareSync(plainPwd, this.password)
}

userSchema.methods.signToken = function () {
    const { _id, email, username } = this;
    const payload = { _id, email, username }

    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: "48h" }
    )

    return authToken
}

const User = model("User", userSchema);

export default User
