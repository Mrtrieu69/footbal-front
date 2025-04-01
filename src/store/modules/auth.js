import * as storage from "@/utils/storage"
import httpRequest from "@/utils/httpRequest.js";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const state = {
    userToken: storage.load("user_token") || null,
    user: storage.load("user") || null,
}

const getters = {
    isAuthenticated(state){
        return !!state.userToken
    },
    user(state){
        return state.user
    },
}

const mutations = {
    setUser(state, payload){
        state.user = payload
        storage.save("user", payload)
    },
    setUserToken(state, payload){
        state.userToken = payload
        storage.save("user_token", payload)
    },
    logout(state){
        state.userToken = ""
        storage.remove("user_token")
    },
}

const actions = {
    async login({commit}, payload) {
        try{
            // const { token } = await httpRequest({
            //     method: "post",
            //     url: "/api/login",
            //     data: payload
            // })

            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDMyNzg5MTAsImV4cCI6MTc0MzYzODkxMCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoib3NzYV9hZG1pbiJ9.Qd36euoRORxq4V-61sgAUaWIByhlvbqqzwXk87ZHAy7NAELdWS_zbTEK4avsZ35TzDwbbSSWR1iFRlxAG4GF0A"
            await commit("setUserToken", token)

            const user = jwtDecode(token)
            await commit("setUser", user)
            return true
        }catch (err){
            throw err
        }
    },
    async logout({commit}) {
        delete axios.defaults.headers['Authorization'];
        commit("logout")

        return true
    }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}