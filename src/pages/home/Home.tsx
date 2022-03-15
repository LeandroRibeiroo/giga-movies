import { Link } from 'react-router-dom';
import { category, movieType, tvType } from '../../api/tmdbApi';
import { OutlineButton } from '../../components/button';
import { HeroSlide } from '../../components/hero-slide/';
import { MovieList } from '../../components/movie-list';

const Home = (): JSX.Element => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Filmes em Alta</h2>
            <Link to="/movie">
              <OutlineButton className="small">Ver mais</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Filmes mais bem avaliados</h2>
            <Link to="/movie">
              <OutlineButton className="small">Ver mais</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Séries populares</h2>
            <Link to="/tv">
              <OutlineButton className="small">Ver mais</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
      </div>
    </>
  );
};

export default Home;
