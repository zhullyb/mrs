import request from "./request";

export default class movieService {
    static async getInfo(mid: string) {
        return await request({
            url: "/api/v1/movie/getInfo",
            method: "GET",
            params: { mid }
        })
    }

    static async SearchMovie(keyword: string) {
        return await request({
            url: "/api/v1/movie/search",
            method: "GET",
            params: { keyword }
        })
    }

    static async getMovieList() {
        return await request({
            url: "/api/v1/movie/display",
            method: "GET",
        })
    }
}