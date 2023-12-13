export interface movieInfo {
    mid: string;
    name: string;
    image?: string;
    director?: string;
    screenwriter?: string;
    mainActor?: Array<string>;
    type?: Array<string>;
    website?: string;
    country?: string;
    language?: string;
    releaseDate?: string;
    length?: string;
    description: string;
}

export interface movieListItem {
    name: string;
    rate: number;
    description?: string;
    image: string;
    mid: string;
}
