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