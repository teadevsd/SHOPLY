import mongoose, { mongo } from "mongoose";

const productSchema = new mongo.Schema({
    name: {
        type: String
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        }
    ],
    sub_category: [
        {
            type:mongoose.Schema.ObjectId,
            ref: sub_category
        }
    ],
    unit : {
        type: String,
        default: 0
    },
    price: {
        type: String,
        default: null
    },
    discount: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }

},{
    timestamps: true
});

const productModel = new mongoose.model("product", productSchema)
export default productModel