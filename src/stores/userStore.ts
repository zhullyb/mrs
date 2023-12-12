import { defineStore } from "pinia";
import { reactive } from "vue";
import { UserInfo } from "../types/userInfo";

const userStore = defineStore(
    "user",
    () => {
        const userSession = reactive<UserInfo>({
            uid: "",
            username: "",
            email: "",
            level: -1,
        });

        const setUserInfo = (userInfo: UserInfo) => {
            userSession.uid = userInfo.uid;
            userSession.username = userInfo.username;
            userSession.email = userInfo.email;
            userSession.level = userInfo.level;
        }

        const clearUserInfo = () => {
            userSession.uid = "";
            userSession.username = "";
            userSession.email = "";
            userSession.level = -1;
        }

        return {
            userSession,
            setUserInfo,
            clearUserInfo
        };
    },
    {
        persist: true
    }
);

export default userStore;