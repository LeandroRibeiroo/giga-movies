import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import { ResponseProps } from '../../utils/interfaces';
import { Button, OutlineButton } from '../button';
import { Input } from '../input';
import { MovieCard } from '../movie-card';
import {
  MovieGridProps,
  MovieSearchProps,
  ParamsPropsForMovieGrid,
} from './interface';
import './movie-grid.scss';

const MovieGrid = ({ category }: MovieGridProps): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);

  const { keyword } = useParams<ParamsPropsForMovieGrid>();

  const loadMore = async () => {
    let response: ResponseProps;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
        language: 'pt-BR',
      };
      switch (category) {
        case 'movie':
          response = (await tmdbApi.getMoviesList('upcoming', {
            params,
          })) as ResponseProps;
          break;
        default:
          response = (await tmdbApi.getTvList('popular', {
            params,
          })) as ResponseProps;
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
        language: 'pt-BR',
      };

      response = (await tmdbApi.search(category, {
        params,
      })) as ResponseProps;
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  useEffect(() => {
    const getList = async () => {
      let response: ResponseProps;

      if (keyword === undefined) {
        const params = {
          language: 'pt-BR',
        };
        switch (category) {
          case 'movie':
            response = (await tmdbApi.getMoviesList('upcoming', {
              params,
            })) as ResponseProps;
            break;
          default:
            response = (await tmdbApi.getTvList('popular', {
              params,
            })) as ResponseProps;
        }
      } else {
        const params = {
          query: keyword,
          language: 'pt-BR',
        };

        response = (await tmdbApi.search(category, {
          params,
        })) as ResponseProps;
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [category, keyword]);

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keywordValue={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard item={item} category={category} key={index} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Carregar mais
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = ({ category }: MovieSearchProps): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');

  const history = useHistory();

  const goToSearch = useCallback(() => {
    if (!keyword) {
      return;
    }

    history.push(`/${category}/search/${keyword}`);
  }, [category, history, keyword]);

  useEffect(() => {
    const enterEvent = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.keyCode === 13) {
        goToSearch();
      }
    };

    document.addEventListener('keyup', enterEvent);

    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Procure por um título"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={() => goToSearch()}>
        Procurar
      </Button>
    </div>
  );
};

export default MovieGrid;
