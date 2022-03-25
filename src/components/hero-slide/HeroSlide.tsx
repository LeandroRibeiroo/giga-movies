import { AxiosRequestConfig } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import { ItemSlideProps, ResponseProps } from '../../utils/interfaces';
import { Button, OutlineButton } from '../button';
import { Modal } from '../modal';
import { ModalContent } from '../modal/Modal';
import './hero-slide.scss';
import { HeroSlideItemProps, TrailerModalProps } from './interface';

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState<ItemSlideProps[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const params: AxiosRequestConfig = {
        params: {
          page: 1,
          language: 'pt-BR',
        },
      };

      try {
        const response = (await tmdbApi.getMoviesList(
          'popular',
          params
        )) as ResponseProps;

        const { results } = response;

        setMovieItems(results.splice(0, 4));
      } catch {
        console.log('Erro');
      }
    };

    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 10000 }}
      >
        {movieItems.map((item: ItemSlideProps, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item: ItemSlideProps, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = ({
  item,
  className,
}: HeroSlideItemProps): JSX.Element => {
  let history = useHistory();

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const params = {
      language: 'pt-BR',
    };

    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = (await tmdbApi.getVideos('movie', item.id, {
      params,
    })) as ResponseProps;

    if (videos.results.length > 0) {
      const trailersArray: any[] = [];

      videos.results.filter((item) =>
        item.type === 'Trailer' ? trailersArray.push(item) : ''
      );

      const videoSrc = 'https://www.youtube.com/embed/' + trailersArray[0]?.key;

      modal
        ?.querySelector('.modal__content > iframe')
        ?.setAttribute('src', videoSrc);
    } else {
      let modalInnerHTML = modal?.querySelector('.modal__content')?.innerHTML;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      modalInnerHTML = 'No Trailer';
    }

    modal?.classList.toggle('active');
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push('/movie/' + item.id)}>
              Assista agora
            </Button>

            <OutlineButton onClick={setModalActive}>Trailer</OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }: TrailerModalProps): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onClose = () => iframeRef.current?.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height={'500px'}
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
