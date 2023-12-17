import React, { useState } from 'react';
import { Pagination } from 'antd';
import TopBar from '../components/topbar';

export default function MovieList() {
  const [poster, setPoster] = useState('');
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const movielist = [
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/1.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/2.jpg",
    "src/images/listMovie/3.jpg",
    "src/images/listMovie/3.jpg",
    "src/images/listMovie/3.jpg",
    "src/images/listMovie/3.jpg",
    
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
          <div key={index}>
            <img src={movie} alt="" />
          </div>
        ))}
        <div className='countpage'>
            <Pagination current={currentPage} total={totalItems}pageSize={itemsPerPage} onChange={onChangePage}/>
        </div>
        
      </div>
    </div>
  );
}
