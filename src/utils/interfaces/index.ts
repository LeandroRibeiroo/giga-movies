import { AxiosResponse } from 'axios';

export interface ResponseProps extends AxiosResponse {
  page: number;
  results: any[];
  cast: any[];
  total_pages: number;
}

export interface ItemSlideProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: GenresProps[];
  id: number;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenresProps {
  id: number;
  name: string;
}

export interface ParamsRoutes {
  category: string;
}
