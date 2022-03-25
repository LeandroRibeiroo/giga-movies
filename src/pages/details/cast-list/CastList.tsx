import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../../api/apiConfig';
import tmdbApi from '../../../api/tmdbApi';
import { ParamsRoutes, ResponseProps } from '../../../utils/interfaces';
import { CastListProps } from './interface';

const CastList = ({ id }: CastListProps): JSX.Element => {
  const [casts, setCasts] = useState<any[]>([]);

  const { category } = useParams<ParamsRoutes>();

  useEffect(() => {
    const getCredits = async () => {
      const response = (await tmdbApi.credits(category, id)) as ResponseProps;
      setCasts(response.cast.slice(0, 5));
    };

    getCredits();
  }, [category, id]);

  return (
    <div className="casts">
      {casts.map((cast, index) => (
        <div key={index} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})`,
            }}
          ></div>
          <p className="casts__item__name">{cast.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
