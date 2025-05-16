import AsyncStorage from "@react-native-async-storage/async-storage";
import { request } from "../Config/Request"
import { KEY_TOKEN } from "@/env";
import { UserLogin } from "../Type/UserType";

export const UserService={
    login: async(data:UserLogin)=>{
        const res = await request.post("/auth",data)
        return res.data;
    },
    findInforUser: async()=>{
        const token = await AsyncStorage.getItem(KEY_TOKEN);
        const tokenStr = token ? JSON.parse(token) : null;
        const res = await request.get(`/auth/findbytoken/${tokenStr}`);
        return res.data;
    }
}