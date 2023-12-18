import React, { useState } from 'react';
import { Image, Card, Flex, Typography, Button, Space} from 'antd';
import TopBar from '../components/topbar';
import DatVe from '../components/bookingButton';

const { Title, Paragraph } = Typography;

export default function MovieInfo() {
    
    const [poster, setPoster] = useState('');
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [rate, setRate] = useState('');
    const [description, setDescription] = useState('');

    // var movieDetails={
    //     "poster": poster,
    //     "name": name,
    //     "description": description,
    // }

    // function getMovieInfo() {
    //     fetch("http://fall2324w20g8.int3306.freeddns.org/api/movie/1", {
            
    //         method: "get",
    //     }).then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.error(error));
    // }

    const movieDetails={
        "poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
        "name": "AVENGERS: END GAME",
        "description": "With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        "genre": "Action",
        "rate": "8.4",
    }

    return (
        <div className='background'>
            <TopBar />
                
            <Space className='movieInfo' direction="horizontal" align="center" >
                <img
                    alt="movie poster"
                    src={movieDetails.poster}
                    className='movieInfoImage'
                />
                <Card
                    hoverable
                    className='movieInfoText'
                >
                    <Space direction="vertical" >
                        <Title level={1} style={{ color: 'white' }}>
                            {movieDetails.name}
                        </Title>
                        <Paragraph style={{ color: 'white' }}>
                            <strong>Genre:</strong> {movieDetails.genre}
                            <br/>
                            <strong>Rate:</strong> {movieDetails.rate}
                            <br/>
                            <strong>Description:</strong> {movieDetails.description}
                        </Paragraph>
                        <div style={{position: 'fixed', bottom: '20px', paddingLeft:'10px'}}><DatVe/></div> 
                    </Space>
                </Card>
            </Space>
        </div>
    );
};