import mongoose from "mongoose";

const cakeSchema = mongoose.Schema({
    name: { type: String, required: true },
    allergic: mongoose.Schema({
        sesame: String,
        egg: Number
    }),
    isDairy: Boolean,
    ManufacturingDate: { type: Date, default: Date.now() },
    severalLayers: Number
})
export const CakeModel = mongoose.model("bakery", cakeSchema);