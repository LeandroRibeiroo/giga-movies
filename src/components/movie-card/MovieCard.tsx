import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import { Button } from '../button';
import { MovieCardProps } from './interface';
import './movie-card.scss';

const MovieCard = ({ item, category }: MovieCardProps): JSX.Element => {
  const link = '/' + category + '/' + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
