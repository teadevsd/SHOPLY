import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, "provide name"] 
    },
    email: {
        type : String,
        required: [true, "provide email"] 
    },
    password: {
        type : String,
        required: [true, "provide password"] 
    },
    avatar: {
        type : String,
        default: ""
    },
    number: {
        type : Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: {
        type: mongoose.Schema.ObjectId,
        ref: "address"
    }, 
    shopping_cart: {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct"
    },
    ordeHistory : {
        type: mongoose.Schema.ObjectId,
        ref: "order"
    },
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: ""
    },
    role : {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }

},{
    timestamps: true
});

const UserModel = new mongoose.model("User", userSchema );
export default UserModel