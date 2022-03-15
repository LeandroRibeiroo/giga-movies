import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi from '../../api/tmdbApi';
import { ItemSlideProps, ResponseProps } from '../../utils/interfaces';
import { MovieCard } from '../movie-card';
import { MovieListProps } from './interface';
import './movie-list.scss';

const MovieList = ({ category, type, id }: MovieListProps): JSX.Element => {
  const [items, setItems] = useState<ItemSlideProps[]>([]);

  useEffect(() => {
    const getList = async () => {
      let response: ResponseProps;
      const params: AxiosRequestConfig = {
        params: {
          page: 1,
          language: 'pt-BR',
        },
      };

      if (type !== 'similar') {
        switch (category) {
          case 'movie':
            response = (await tmdbApi.getMoviesList(
              type,
              params
            )) as ResponseProps;
            break;
          default:
            response = (await tmdbApi.getTvList(type, params)) as ResponseProps;
        }
      } else {
        response = (await tmdbApi.similar(category, id ?? '')) as ResponseProps;
      }

      setItems(response.results);
      console.log(response.results);
    };

    getList();
  }, [category, id, type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item, index) => (
          <SwiperSlide>
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
