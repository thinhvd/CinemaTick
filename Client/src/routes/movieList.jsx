import React, { useState } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import TopBar from '../components/topbar';

export default function MovieList() {
  const [poster, setPoster] = useState('');
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const movielist = [
    {
      id: 1,
      poster:"src/images/listMovie/1.jpg",
      name: "Avenger: End Game",
    },
    {
      id: 2,
      poster:"src/images/listMovie/2.jpg",
      name: "Avenger: Infinity War",
    },
    {
      id: 3,
      poster:"src/images/listMovie/3.jpg",
      name: "Iron Man 2",
    },
    {
      id: 4,
      poster:"src/images/listMovie/4.jpg",
      name: "Spider Man: Accross the Spider-Verse",
    },
    {
      id: 5,
      poster:"src/images/listMovie/5.jpg",
      name: "Spider Man 2",
    },
    {
      id: 6,
      poster:"src/images/listMovie/6.jpg",
      name: "Black Panther",
    },
    {
      id: 7,
      poster:"src/images/listMovie/7.jpg",
      name: "Spider Man: No Way Home",
    },
    {
      id: 8,
      poster:"src/images/listMovie/8.jpg",
      name: "Captain America: The First Avenger",
    },
    {
      id: 1,
      poster:"src/images/listMovie/1.jpg",
      name: "Avenger: End Game",
    },
    {
      id: 2,
      poster:"src/images/listMovie/2.jpg",
      name: "Avenger: Infinity War",
    },
    {
      id: 3,
      poster:"src/images/listMovie/3.jpg",
      name: "Iron Man 2",
    },
    {
      id: 4,
      poster:"src/images/listMovie/4.jpg",
      name: "Spider Man: Accross the Spider-Verse",
    },
    {
      id: 5,
      poster:"src/images/listMovie/5.jpg",
      name: "Spider Man 2",
    },
    {
      id: 6,
      poster:"src/images/listMovie/6.jpg",
      name: "Black Panther",
    },
    {
      id: 7,
      poster:"src/images/listMovie/7.jpg",
      name: "Spider Man: No Way Home",
    },
    {
      id: 8,
      poster:"src/images/listMovie/8.jpg",
      name: "Captain America: The First Avenger",
    },

    
    
  ];

  const totalItems = movielist.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = movielist.slice(startIndex, endIndex);

  return (
    <div className='background'>
      <TopBar />

      <div className='movielist'>
        {currentItems.map((movie, index) => (
          <div key={movie.id}>
            <Link to={`/movieinfo`}>
              <img src={movie.poster} alt="{movie.name}" />
            </Link>
            <div>
              <h3>{movie.name}</h3>
            </div>
          </div>
        ))}
        <div className='countpage'>
            <Pagination current={currentPage} total={totalItems}pageSize={itemsPerPage} onChange={onChangePage}/>
        </div>
        
      </div>
    </div>
  );
}
