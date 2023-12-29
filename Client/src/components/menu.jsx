import React, {useState} from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    label: (
        <Link to={`/movielist`}>DANH SÁCH PHIM</Link>
    ),
  },
  {
    key: '2',
    label: (
      <a target="" rel="" >
        VỀ CHÚNG TÔI
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="" rel="" >
        DỊCH VỤ VÀ QUẢNG CÁO
      </a>
    ),
  },
];


export default function MenuMovie() {
    return (
      <Dropdown
        id="menu"
        style={{
          width:'300px',
        }}
        menu={{
          items,
        }}
      >
        <Button 
          style={{
            height: "10vh",
            width: '10vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color:'#fff',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            padding:'0',
            borderRadius:'none'
          }}
        >
          <MenuOutlined
            style={{
              padding:'3px',
              fontSize:'2.5em'
            }}
          />
          <div>Menu</div>
        </Button>
      </Dropdown>
    )
}