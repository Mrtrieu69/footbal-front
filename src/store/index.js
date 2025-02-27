import { createStore } from "vuex";
import auth from "./modules/auth"
import settings from "./modules/settings.js"

export default createStore({
    modules: {
        auth,
        settings
    }
})