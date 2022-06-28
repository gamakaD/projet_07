import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state: {
        token: null,
        user: null,
        role: ''
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        },
        role(state) {
            return state.role
        },
        admin(state) {
            return state.role === 'admin'
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUser(state, user) {
            state.user = user
        },
        setRole(state, role) {
            state.role = role
        }
    },
    actions: {
        async login({ dispatch }, credentials) {
            let response = await axios.post('auth/login', credentials)
            return dispatch('attempt', response.data.token)
        },

        async attempt({ commit, state }, token) {
            if (token) {
                commit('setToken', token)
            }
            if (!state.token) {
                return
            }
            try {
                let response = await axios.get('auth/user', { headers: { 'Authorization': 'Bearer ' + token } })
                commit('setUser', response.data.email)
                commit('setRole', response.data.role)
            } catch (e) {
                commit('setToken', null)
                commit('setUser', null)
            }
        },

        logout({ commit }) {
            commit('setToken', null)
            commit('setUser', null)
        }
    },
})

export default store 