import mongoose from 'mongoose'

const faucetsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
)

const Daily = mongoose.model('Daily', faucetsSchema)

export default Daily
