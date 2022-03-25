import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../../api/tmdbApi';
import { ParamsRoutes, ResponseProps } from '../../../utils/interfaces';
import { VideoListProps, VideoProps } from './interface';

const VideoList = ({ id }: VideoListProps): JSX.Element => {
  const [videos, setVideos] = useState<any[]>([]);

  const { category } = useParams<ParamsRoutes>();

  useEffect(() => {
    const getVideos = async () => {
      const params = {
        language: 'pt-BR',
      };
      const response = (await tmdbApi.getVideos(category, id, {
        params,
      })) as ResponseProps;
      setVideos(response.results.slice(0, 5));
    };

    getVideos();
  }, [category, id]);

  return (
    <>
      {videos.map((item, index) => (
        <Video key={index} item={item} />
      ))}
    </>
  );
};

const Video = ({ item }: VideoProps): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const height = (iframeRef?.current?.offsetWidth! * 9) / 16 + 'px';

    iframeRef.current?.setAttribute('height', height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        title={`${item.key}`}
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
      ></iframe>
    </div>
  );
};
export default VideoList;
