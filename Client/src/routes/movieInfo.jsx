import React, { useState,useEffect } from 'react';
import { Image, Card, Flex, Typography, Button, Space} from 'antd';
import TopBar from '../components/topbar';
import DatVe from '../components/bookingButton';
import { useParams } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const MovieInfo = () => {
    const [movieinfo, setMovieinfo] = useState([]);

  useEffect(() => {
    getMovieInfo();
  }, []);

  const getMovieInfo = async () => {
    try {
      const response = await fetch("http://fall2324w20g8.int3306.freeddns.org/api/movies");
      const responseData = await response.json();

      setMovieinfo(responseData);
    } catch (error) {
      console.error(error);
    }
  };

    const { id } = useParams();
    const movie = movieinfo && movieinfo.find((m) => m.id === parseInt(id));


    return (
        <div className='background'>
            <TopBar />
            <Space className='movieInfo' direction="horizontal" align="center" >
                {movie ? (
                    <>
                        <img src={movie.poster} alt="movie poster" className='movieInfoImage' />
                        <Card hoverable className='movieInfoText'>
                            <Space direction='vertical'>
                                <Title level={1} style={{ color: 'white' }}>
                                    {movie.name}
                                </Title>
                                <Paragraph style={{ color: 'white' }}>
                                    <strong>Genre:</strong> {movie.genre}
                                    <br />
                                    <strong>Rate:</strong> {movie.rating}
                                    <br />
                                    <strong>Description:</strong> {movie.description}
                                </Paragraph>
                                    <div style={{ position: 'fixed', bottom: '20px', paddingLeft: '10px' }}>
                                        <DatVe />
                                    </div>
                            </Space>
                        </Card>
                    </>
                ) : (
                    <></>
                )}
            </Space>
        </div>
    );
};

export default MovieInfo;