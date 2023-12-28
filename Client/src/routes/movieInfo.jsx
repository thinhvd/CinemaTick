import React, { useState, useEffect } from 'react';
import { Image, Card, Flex, Typography, Button, Space } from 'antd';
import TopBar from '../components/topbar';
import { useParams, Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function MovieInfo() {
    const [movieinfo, setMovieinfo] = useState([]);
    const [movieSchedule, setMovieSchedule] = useState(null);

    useEffect(() => {
        getMovieInfo();
    }, []);

    const getMovieInfo = async () => {
        try {
            const response = await fetch(`http://fall2324w20g8.int3306.freeddns.org/api/movies_nopage`);
            const responseData = await response.json();

            setMovieinfo(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    const { id } = useParams();
    const movie = movieinfo && movieinfo.find((m) => m.id === parseInt(id));

    console.log(id);

    const getMovieSchedule = async () => {
        try {
            const response = await fetch(`http://fall2324w20g8.int3306.freeddns.org/api/show/movie/${id}`);
            const data = await response.json();
            data.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));
            const groupedData = groupByDate(data);
            setMovieSchedule(groupedData);
        } catch (error) {
            console.error(error);
        }
    };

    const groupByDate = (data) => {
        const groupedData = {};
        data.forEach((scheduleItem) => {
            const date = new Date(scheduleItem.schedule).toLocaleDateString();
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(scheduleItem);
        });
        Object.keys(groupedData).forEach((date) => {
            groupedData[date].sort((a, b) => new Date(a.schedule) - new Date(b.schedule));
        });
        return groupedData;
    };
    
    return (
        <div className='background'>
            <TopBar />
            <Space className='movieSchedule' direction="vertical" align="center">
                {movie ? (
                    <>
                        <Space className='movieInfo' direction="horizontal" align="center" >
                            <img src={movie.poster} alt="movie poster" className='movieInfoImage' />
                            <Card className='movieInfoText'>
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
                                        <Button className="button" onClick={getMovieSchedule}>Đặt vé</Button>
                                    </div>
                                </Space>
                            </Card>
                        </Space>
                        {movieSchedule && (
                            <Space className='schedule' direction="vertical" align="center">
                                {Object.keys(movieSchedule).map((date) => (
                                    <Space key={date} direction="horizontal" align="center">
                                        <h2>{date}</h2>
                                        <Card className='time'>
                                            <Space direction='horizontal' size="large">
                                                {movieSchedule[date].map((scheduleItem) => (
                                                    <div key={scheduleItem.id}>
                                                        <Link to={`/selectseat/${scheduleItem.id}`}>
                                                            <Button className="buttonstyle">{new Date(scheduleItem.schedule).toLocaleTimeString()}</Button>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </Space>
                                        </Card>
                                    </Space>
                                ))}
                            </Space>
                        )}
                    </>
                ) : (
                    <></>
                )
                }
            </Space >
        </div >
    );
};