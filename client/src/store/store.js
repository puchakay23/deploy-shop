import { configureStore } from "@reduxjs/toolkit";
import autheducer from "./auth-slice"
import adminProductSlice from "./admin/products-slice"
import shopProductSlice from "./shop/products-slice"
import shopCartSlice from "./shop/cart-slice"
import shopAddressSlice from "./shop/address-slice"

const store = configureStore({
    reducer: {
        auth: autheducer,
        adminProducts: adminProductSlice,
        shopProducts: shopProductSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice
    }
})

export default store