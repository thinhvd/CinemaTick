import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';


function List() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        getMovieList();
    }, []);

      const getMovieList = async () => {
        try {
            const response = await fetch("http://fall2324w20g8.int3306.freeddns.org/api/movies_nopage");
            const responseData = await response.json();
            console.log(responseData);
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
        grid-template-columns: repeat(${movies.length},12.6vw);
        transition: all 0.3s linear;
        user-select:none;
        overflow:hidden;
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
        const vwEquivalent = 12.6;
        const viewportWidth = window.innerWidth;
        const pixelEquivalent = (vwEquivalent / 100) * viewportWidth;
        const movieSlider = movieSliderRef.current;
        const newScrollLeft = Math.max(scrollLeft - pixelEquivalent, 0); // Giới hạn scrollLeft không vượt quá 0
        console.log(scrollLeft);
        setScrollLeft(newScrollLeft);
        
      };
    
      const handleMoveRight = () => {
        const vwEquivalent = 12.6;
        const viewportWidth = window.innerWidth;
        const pixelEquivalent = (vwEquivalent / 100) * viewportWidth;
        const movieSlider = movieSliderRef.current;
        const newScrollLeft = Math.min(scrollLeft + pixelEquivalent, movieSlider.scrollWidth - movieSlider.clientWidth);
        console.log(scrollLeft)
        setScrollLeft(newScrollLeft);
        
      };

    return (
        <MovieRowContainer>
            <MovieSlider ref={movieSliderRef}> 
                {
                    movies.map((movie, index) => (
                        <div key={index} className='movieItem'>
                            <Link to={`/movieinfo/${movie.id}`}>
                                <img src={movie.poster} alt="{movie.name}" />
                            </Link>
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
