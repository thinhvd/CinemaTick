import React, { useState } from 'react';
import { Image, Card, Flex, Typography, Button } from 'antd';
import TopBar from '../components/topbar';

export default function MovieInfo() {

    const [poster, setPoster] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    var movieDetails={
        "poster": poster,
        "name": name,
        "description": description,
    }

    function getMovieInfo() {
        fetch("http://fall2324w20g8.int3306.freeddns.org/api/movie/1", {
            
            method: "get",
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return (
        <div className='background'>
            <TopBar />
            <img
                alt="avatar"
                src="/src/images/listMovie/1.jpg"
                style={{
                    position:'absolute',
                    top:'40%',
                    left:'15%',
                    scale:'2'
                }}
            >
            </img>

            {/* <Card
                hoverable
                style={{ 
                    position:'absolute',
                    top:'30%',
                    left:'10%',right:'30%',
                    backgroundColor:'transparent',
                }}
            >
                <Flex justify='flex-start'>
                    <img
                        alt="avatar"
                        src="/src/images/listMovie/1.jpg"
                        
                    >
                    </img>
                    <Flex
                        vertical
                        align="flex-start"
                        justify="space-between"
                        style={{
                            padding: 32,
                        }}
                    >
                        <Typography.Title level={1}
                            style={{
                                color:'white'
                            }}
                        >
                            AVENGER:END GAME
                        </Typography.Title>
                        <Typography.Title level={4}
                            style={{
                                color:'white'
                            }}
                        >
                            Description: After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.    
                            <br/>
                            Duration: 3
                        </Typography.Title>
                        <Button type="primary" href="https://ant.design" target="_blank">
                            Get Started
                        </Button>
                    </Flex>
                </Flex>
            </Card> */}



            {/* <div
                style={{
                    height:'90vh',
                    // border:'none',
                    backgroundColor:'transparent',
                    marginTop:'10vh',
                    color: 'white',
                    display:'flex',
                }}
            >
                <Image
                    className='movieInfoImage'
                    src="/src/images/listMovie/1.jpg"
                    preview={false}
                />
                <div className='movieInfoText'>
                    <div id='tenphim'>AVENGER:END GAME</div>
                    <div id='tomtat'>After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.</div>
                </div>
                <Card className='cardDatVe'>
                    
                </Card> 
            </div> */}
        </div>
    );
};