import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import TopBar from '../components/topbar';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage=10;

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    try {
      const response = await fetch("http://fall2324w20g8.int3306.freeddns.org/api/movies_nopage");
      const responseData = await response.json();

      setMovies(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const totalItems = movies.length;

  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  const startIndex = (currentPage-1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = movies.slice(startIndex, endIndex);

  console.log(startIndex);

  return (
    <div className='background'>
      <TopBar />
      <div className='movielist'>
        {currentItems.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movieinfo/${movie.id}`}>
              <img src={movie.poster} alt="{movie.name}" />
            </Link>
            <div>
              <h3>{movie.name}</h3>
            </div>
          </div>
        ))}
        <div className='countpage'>
          <Pagination current={currentPage} total={totalItems} pageSize={itemsPerPage} onChange={onChangePage} />
        </div>
      </div>
    </div>
  );
}

