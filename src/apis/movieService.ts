import request from "./request";

export default class movieService {
    static async getInfo(mid: string) {
        return await request({
            url: "/api/v1/movie/getInfo",
            method: "GET",
            params: { mid }
        })
    }
}