import mongoose from 'mongoose'

const { Schema } = mongoose;

const cartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, required: true, default: 1 },
    deliveryOptionId: { type: Schema.Types.ObjectId, ref: 'ship' }
})

const Cart = mongoose.model('cart', cartSchema)
export default Cart