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
      <Link to={`/cinematick`}>VỀ CHÚNG TÔI</Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to={`/cinematick`}>DỊCH VỤ VÀ QUẢNG CÁO</Link>
    ),
  },
  {
    key: '4',
    label: (
      <Link to={`/admin/users`}>ADMIN</Link>
    ),
  },
];


export default function MenuMovie() {
    return (
      <Dropdown
        id="menu"
        style={{
          width:'20vw',
        }}
        menu={{
          items,
        }}
      >
        <Button 
          style={{
            height: "5vw",
            width: '5vw',
            backgroundColor: 'transparent',
            color:'#fff',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            padding:'0',
            borderRadius:'none',
            border:'none'
          }}
        >
          <MenuOutlined
            style={{
              padding:'0.5vw',
            }}
          />
          <div>Menu</div>
        </Button>
      </Dropdown>
    )
}