import mongoose from "mongoose";
import { Schema } from "mongoose";

const itemSchema = new Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    }, name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    slug: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    brand: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    countInStock: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    image: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
})

const Item = mongoose.model('Items', itemSchema)
export default Item;