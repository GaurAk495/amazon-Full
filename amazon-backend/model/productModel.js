import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        stars: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            required: true,
            min: 0
        }
    },
    priceCents: {
        type: Number,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    }
});

const Product = mongoose.model('product', productSchema);

export default Product;
