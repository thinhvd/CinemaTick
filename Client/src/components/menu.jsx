import React, {useState} from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, icon, children,) {
  return {
    
    icon,
    label,
    children,
  };
}

const items = [
    getItem(null,<MenuOutlined style={{ color: '#c5c6c7', scale: '2.5' }}/>,[
        getItem('Danh sách phim', null),
        getItem('Lịch',null)
    ])
]

export default function MenuMovie() {
    const [collapsed, setCollapsed] = useState(false);
    
    return (
        <Menu
            style={{
                backgroundColor: 'transparent'
            }}
            mode="horizontal"
            horizontalCollapsed={collapsed}
            items={items}
        />
      )
}