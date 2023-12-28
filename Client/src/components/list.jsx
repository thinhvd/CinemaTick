import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


function List(props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovieList();
    }, []);

      const getMovieList = async () => {
        try {
          const response = await fetch("http://fall2324w20g8.int3306.freeddns.org/api/movies");
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
console.log(movies.length)
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollRight, setScrollRight] = useState(0);

    useEffect(() => {
        // Cập nhật giá trị scrollLeft vào thuộc tính scrollLeft của MovieSlider
        const movieSlider = document.getElementById('movieSlider');
        if (movieSlider) {
            movieSlider.scrollLeft = scrollLeft;
        }
    }, [scrollLeft]);

    useEffect(() => {
        // Cập nhật giá trị scrollRight vào thuộc tính scrollRight của MovieSlider
        const movieSlider = document.getElementById('movieSlider');
        if (movieSlider) {
            movieSlider.scrollRight = scrollRight;
        }
    }, [scrollRight]);

    const handleMoveLeft = () => {
        setScrollLeft((prev) => prev - 230);
    };

    const handleMoveRight = () => {
        setScrollRight((prev) => prev + 230);
    };

    return (
        <MovieRowContainer>
            <MovieSlider> 
                {
                    movies.map((movie, index) => (
                        <div key={index} className='movieItem'>
                            <Link to={`/movieinfo/${movie.id}`}>
                                <img src={movie.poster} alt="" />
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
