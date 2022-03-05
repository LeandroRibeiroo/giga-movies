import { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';
import { ICategory, IMovieType, ITvType } from './interfaces';

export const category: ICategory = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType: IMovieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType: ITvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
};

const tmdbApi = {
  getMoviesList: (
    type: string,
    params: AxiosRequestConfig<any> | undefined
  ) => {
    const url = 'movie/' + type;
    return axiosClient.get(url, params);
  },
  getTvList: (type: string, params: AxiosRequestConfig<any> | undefined) => {
    const url = 'tv/' + type;
    return axiosClient.get(url, params);
  },
  getVideos: (category: string, id: string) => {
    const url = category + '/' + id + '/videos';
    return axiosClient.get(url, { params: {} });
  },
  search: (category: string, params: AxiosRequestConfig<any> | undefined) => {
    const url = 'search/' + category;
    return axiosClient.get(url, params);
  },
  details: (
    category: string,
    id: string,
    params: AxiosRequestConfig<any> | undefined
  ) => {
    const url = category + '/' + id;
    return axiosClient.get(url, params);
  },
  credits: (category: string, id: string) => {
    const url = category + '/' + id + '/credits';
    return axiosClient.get(url, { params: {} });
  },
  similar: (category: string, id: string) => {
    const url = category + '/' + id + '/similar';
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
