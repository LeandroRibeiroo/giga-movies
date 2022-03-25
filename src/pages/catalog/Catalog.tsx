import { useParams } from 'react-router-dom';
import { MovieGrid } from '../../components/movie-grid';
import { PageHeader } from '../../components/page-header';
import { ParamsRoutes } from '../../utils/interfaces';
import './catalog.scss';

const Catalog = (): JSX.Element => {
  const { category } = useParams<ParamsRoutes>();

  return (
    <>
      <PageHeader>
        {category === 'movie' ? 'Filmes' : 'Séries de TV'}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
