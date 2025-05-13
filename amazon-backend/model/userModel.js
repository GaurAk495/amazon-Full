import mongoose from 'mongoose'

const { Schema } = mongoose
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cartItems: [{ type: Schema.Types.ObjectId, ref: 'cart' }]
})

const User = mongoose.model('User', userSchema)
export default User