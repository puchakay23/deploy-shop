import { configureStore } from "@reduxjs/toolkit";
import autheducer from "./auth-slice"

const store = configureStore({
    reducer: {
        auth: autheducer,
    }
})

export default store