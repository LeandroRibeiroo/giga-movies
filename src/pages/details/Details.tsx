import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import { MovieList } from '../../components/movie-list';
import { ItemSlideProps } from '../../utils/interfaces';
import { CastList } from './cast-list';
import './details.scss';
import { ParamsDetailsProp } from './interface';
import { VideoList } from './video-list';

const Details = (): JSX.Element => {
  const [item, setItem] = useState<ItemSlideProps>({} as ItemSlideProps);

  const { category, id } = useParams<ParamsDetailsProp>();

  useEffect(() => {
    const getDetail = async () => {
      const params = {
        language: 'pt-BR',
      };

      const response = (await tmdbApi.details(category, id, {
        params,
      })) as unknown as ItemSlideProps;

      setItem(response);
      window.scrollTo(0, 0);
    };

    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre) => (
                    <span className="genres__item" key={genre.id}>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Ficha técnica</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Parecidos</h2>
              </div>
              <MovieList type="similar" category={category} id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
