import React from 'react';
import { Carousel } from 'antd';

const adImages = [
  'https://i.redd.it/1p4sbmqzvys61.jpg',
  'https://img.freepik.com/premium-vector/realistic-popcorn-cinema-movie-watching-concept-online-filmshow-entertainment-3d-cinematic-objects-two-tickets-snack-drink-promotion-flyer-vector-horizontal-isolated-poster_176411-4140.jpg',
  'https://intphcm.com/data/upload/poster-do-an-dong-gia.jpg',
  'https://pbs.twimg.com/media/D2jvOdmUgAALnnx.jpg',
];

export default function Advertisment() {
  return (
    <Carousel autoplay speed={1500}>
      {adImages.map((imageUrl, index) => (
        <div key={index}>
            <img src={imageUrl} alt="{`ad-${index}`}" style={{ minWidth: '100%', minHeight: '41vw' }} />
        </div>
      ))}
    </Carousel>
  );
}