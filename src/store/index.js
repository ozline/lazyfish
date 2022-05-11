import { createStore } from "vuex";


const store = createStore({
state() {
    return {
    count: 0,
    categories : [],
    categories_raw : [],
    login : false,
    userData : [],
    };
},
mutations: {
    increment(state) {
    state.count++;
    },
},
});

export default store