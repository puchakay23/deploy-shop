import { configureStore } from "@reduxjs/toolkit";
import autheducer from "./auth-slice"
import adminProductSlice from "./admin/products-slice"

const store = configureStore({
    reducer: {
        auth: autheducer,
        adminProducts: adminProductSlice
    }
})

export default store