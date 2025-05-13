import mongoose from "mongoose";

const OrderedProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, // or String if using UUIDs
        required: true,
        ref: "product",
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    estimatedDeliveryTime: {
        type: Date,
        required: true,
    },
});

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Or String if userId is not ObjectId
            required: true,
            ref: "User",
        },
        orderTime: {
            type: Date,
            required: true,
            default: Date.now,
        },
        totalCostCents: {
            type: Number,
            required: true,
        },
        products: {
            type: [OrderedProductSchema],
            required: true,
            validate: v => Array.isArray(v) && v.length > 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
