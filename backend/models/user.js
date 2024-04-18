import mongoose from 'mongoose'
import faucet from "./faucet.js";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            index:true
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        faucets:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faucet'}]
    },

)

const User = mongoose.model('User', userSchema)

export default User
