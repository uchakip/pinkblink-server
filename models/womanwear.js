import { mongoose,  Schema } from "mongoose";

const WomanwearSchema = new Schema({
    cover:{
        type: String,
        required: true
    },
    cover2:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalprice:{
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    stock: {
           type: Number,
           required: true,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
});

export const productModel = mongoose.model('womanwear', WomanwearSchema);