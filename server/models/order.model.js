import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId : {
        type: String,
        default: [true, "Provide orderId"],
        unique: true
    },
    product_Id : {
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    product_details : {
        type: String,
        image: Array,
    },
    payment_Id : {
        type: String,
        default: ""
    },
    payment_status : {
        type: String,
        default: ""
    },
    delivery_address : {
        type: mongoose.Schema.ObjectId,
        ref: "address"
    },
    subTotalAmt : {
        type: Number,
        default: 0
    },
    totalAmt : {
        type: Number,
        default: 0
    },
    invoice_receipt : {
        type: String,
        default: ""
    }
},{
    timestamps: true
});

const orderModel = new mongoose.model("order", orderSchema);
export default orderModel;