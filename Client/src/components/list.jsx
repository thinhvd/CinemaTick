import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState, useEffect} from 'react';


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

    const handleMoveLeft = () => {
        setScrollLeft((prev) => {
            console.log("Move Left clicked");
            console.log("New scrollLeft:", prev - 230);
            return prev - 230;
        });
    };
    
    const handleMoveRight = () => {
        setScrollLeft((prev) => {
            console.log("Move Right clicked");
            console.log("New scrollLeft:", prev + 230);
            return prev + 230;
        });
    };

    return (
        <MovieRowContainer>
            <MovieSlider> 
                {
                    movies.map((movie, index) => (
                        <div key={index} className='movieItem'>
                            <img src={movie.poster} alt=""/>
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
