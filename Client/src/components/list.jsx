import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';


function List(props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovieList();
    }, []);

      const getMovieList = async () => {
        try {
          const response = await fetch("http://fall2324w20g8.int3306.freeddns.org/api/movies_nopage");
          const responseData = await response.json();

          setMovies(responseData);
        } catch(error) {
          console.error(error);
        }
    };

    const MovieRowContainer = styled.div`    
        background-color: var(--color-background);
        color:var(--color-white);
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    `;

    const MovieSlider = styled.div`
        display: grid;
        grid-template-columns: repeat(${movies.length},230px);
        transition: all 0.3s linear;
        user-select:none;
        overflow-y:hidden;
        overflow-x:auto;
        scroll-behavior: smooth;
        white-space: nowrap;
    `;

    const [scrollLeft, setScrollLeft] = useState(0);
    const movieSliderRef = useRef(null);


    useEffect(() => {
        if (movieSliderRef.current) {
            movieSliderRef.current.scrollLeft = scrollLeft;
        }
    }, [scrollLeft]);

    const handleMoveLeft = () => {
        const movieSlider = movieSliderRef.current;
        const newScrollLeft = Math.max(scrollLeft - 230, 0); // Giới hạn scrollLeft không vượt quá 0
        setScrollLeft(newScrollLeft);
        console.log(scrollLeft);
        if (movieSlider) {
          movieSlider.scrollLeft = newScrollLeft;
        }
      };
    
      const handleMoveRight = () => {
        const movieSlider = movieSliderRef.current;
        const newScrollLeft = Math.min(scrollLeft + 230, movieSlider.scrollWidth - movieSlider.clientWidth);
        setScrollLeft(newScrollLeft);
        console.log(scrollLeft)
        if (movieSlider) {
          movieSlider.scrollLeft = newScrollLeft;
        }
      };

    return (
        <MovieRowContainer>
            <MovieSlider ref={movieSliderRef}> 
                {
                    movies.map((movie, index) => (
                        <div key={index} className='movieItem'>
                            <img src={movie.poster} alt="" />
                            <div className='movieName'>{movie.name}</div>
                        </div>
                    ))
                }
            </MovieSlider>
            <div className='moveLeft' onClick={handleMoveLeft}>
                <LeftOutlined/>
            </div>
            <div className='moveRight' onClick={handleMoveRight}>
                <RightOutlined/>
            </div>
        </MovieRowContainer>
    )
}
export default List;
