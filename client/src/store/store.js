import { configureStore } from "@reduxjs/toolkit";
import autheducer from "./auth-slice"
import adminProductSlice from "./admin/products-slice"
import adminOrderSlice from "./admin/order-slice"
import shopProductSlice from "./shop/products-slice"
import shopCartSlice from "./shop/cart-slice"
import shopAddressSlice from "./shop/address-slice"
import shopOrderSlice from "./shop/order-slice"
import searchSlice from "./shop/search-slice"

const store = configureStore({
    reducer: {
        auth: autheducer,

        adminProducts: adminProductSlice,
        adminOrder: adminOrderSlice,

        shopProducts: shopProductSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: searchSlice
    }
})

export default store