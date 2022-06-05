import { createStore } from "vuex";


const store = createStore({
state() {
    return {
    count: 0,
    categories : [], //raw的Map形式数据
    categories_upload : [], //用于upload的数据，顺应tdesign
    categories_raw : [],  //类型原始数据
    login : false,
    userData : [],
    userStatus : 0, //0=normal 1=admin
    Itemdata : [],
    };
},
mutations: {
    increment(state) {
    state.count++;
    },
},
});

export default store