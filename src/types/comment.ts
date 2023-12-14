export interface commentListItem {
    uid: string;
    cid: string;
    author: string;
    avatar: string;
    datetime: string;
    rate: number;
    content: string;
}

export interface editCommentItem {
    cid: string;
    content: string;
    rate: number;
}