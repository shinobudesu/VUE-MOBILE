import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象
    table1Person: [],
    table2Person: [],
    formData1: [],
    formData2: [],
    pageFlag: false,
    page: 1
    //要设置的初始属性值
};
const getters = {   //实时监听state值的变化(最新状态)

};
const mutations = {
    setPageFlag(state) {
        state.pageFlag = !state.pageFlag;
    },
    setTable2Person(state, data) {
        state.table2Person = data;
    },
    setTable1Person(state, data) {
        state.table1Person = data;
    },
    setFormData2(state, data) {
        let a = [];

        if (state.formData2.length > 0) {
            state.formData2.map(item => {
                a.push(item.id);
            })
            if (a.indexOf(data.id) != -1) {
                state.formData2.map(it => {
                    if (it.id == data.id) {
                        it.data = data.data;
                    }
                })
            } else {
                state.formData2.push(data);
            }

        } else {
            state.formData2.push(data);
        }

    },
    setFormData1(state, data) {
        let a = [];

        if (state.formData1.length > 0) {
            state.formData1.map(item => {
                a.push(item.id);
            })
            if (a.indexOf(data.id) != -1) {
                state.formData1.map(it => {
                    if (it.id == data.id) {
                        it.data = data.data;
                    }
                })
            } else {
                state.formData1.push(data);
            }

        } else {
            state.formData1.push(data);
        }

    },
    addPage(state) {
        state.page++;
    },
    delPage(state) {
        state.page--;
    }
};
const actions = {

};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;