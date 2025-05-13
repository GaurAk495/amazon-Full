import mongoose from 'mongoose'

const deliverySchema = new mongoose.Schema({
    days: {
        type: Number,
        required: true,
        min: 1
    },
    priceCents: {
        type: Number,
        required: true,
        min: 0
    }
});

const Ship = mongoose.model('ship', deliverySchema);
export default Ship;