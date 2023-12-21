import request from "./request";

export default class userService {
    static async login(data: {
        username: string;
        password: string;
    }) {
        return await request({
            url: "/api/v1/user/login",
            method: "POST",
            data: data
        })
    }

    static async register(data: {
        username: string;
        password: string;
        email: string;
    }) {
        return await request({
            url: "/api/v1/user/register",
            method: "POST",
            data: data
        })
    }

    static async getUsers() {
        return await request({
            url: "/api/v1/user/getUsers",
            method: "GET",
        })
    }

    static async deleteUser(uid: string) {
        return await request({
            url: "/api/v1/user/deleteUser",
            method: "POST",
            data: { uid }
        })
    }
}