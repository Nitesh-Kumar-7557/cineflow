interface Movie {
    id: number;
    name?:string;
    title?: string;
    poster_path: string;
    overview: string;
    first_air_date: string;
    media_type: string;
    genre_ids: number[];
}
export type {Movie}