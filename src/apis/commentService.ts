import request from "./request";

export default class commentService {
    static async getCommentList(mid: string) {
        return await request({
            url: "/api/v1/comment/getList",
            method: "GET",
            params: { mid }
        })
    }

    static async addComment(data: {
        mid: string;
        content: string;
        uid: string;
        rate: number;
    }) {
        return await request({
            url: "/api/v1/comment/add",
            method: "POST",
            data: data
        })
    }
}