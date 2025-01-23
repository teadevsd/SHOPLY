import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    phoneNumber: "",
    state: "",
    city: "",
    verify_email: "",
    last_login_date: "",
    status: "",
    role: "",
    address_details: "",
    shopping_cart: "",
    orderHistory: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
            state.email = action.payload?.email
            state.avatar = action.payload?.avatar
            state.phoneNumber = action.payload?.phoneNumber
            state.state = action.payload?.state
            state.city = action.payload?.city
            state.verify_email = action.payload?.verify_email
            state.last_login_date = action.payload?.last_login_date
            state.status = action.payload?.status
            state.role = action.payload?.role
            state.address_details = action.payload?.address_details
            state.shopping_cart = action.payload?.shopping_cart
            state.orderHistory = action.payload?.orderHistory
        },
        logout :(state, action) => {
            state._id = ""
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.avatar = ""
            state.phoneNumber = ""
            state.state = ""
            state.city = ""
            state.verify_email = ""
            state.last_login_date = ""
            state.status = ""
            state.role = ""
            state.address_details = []
            state.shopping_cart = []
            state.orderHistory = []
        }
    }
})

export const { setUserDetails, logout} = userSlice.actions;

export default userSlice.reducer