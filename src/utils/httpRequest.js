import axios from "axios"
import * as storage from "@/utils/storage"
import { ERROR_MESSAGE_500 } from "@/utils/dictionary.js"
import store from "@/store/index.js";
import router from "@/router/index.js";
import {isObject} from "@/utils/object.js";

const baseRequest = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URI,
    withCredentials: true
})

baseRequest.interceptors.request.use(config => {
    const token = storage.load("user_token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

const httpRequest = async (options) => {
    try{
        const { data: res } = await baseRequest(options)

        return res
    }catch (err){
        console.log("HTTP request err", err)

        if(err.response?.data){
            if(err.response.data.code === 401){
                await store.commit("auth/logout")
                await router.push({name: "login"})
            }

            if (err.response.data?.data){
                if(Array.isArray(err.response.data?.data) && err.response.data?.data.length){
                    throw err.response.data?.data
                }

                if(isObject(err.response.data?.data)){
                    throw err.response.data?.data
                }
            }

            if (err.response.data.message){
                throw err.response.data.message
            }
        }else if (err.message){
            throw err.message
        } else{
            throw ERROR_MESSAGE_500
        }
    }
}

export default httpRequest
