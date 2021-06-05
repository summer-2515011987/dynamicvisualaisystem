import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"
import app from "./modules/app"
import premission from "./modules/premission"
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    user,
    app,
    premission,
    getters
});
export default store