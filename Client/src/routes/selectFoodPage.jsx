import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import { DoubleRightOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';

export default function SelectFoodPage() {
  return (
    <Layout>
        <TopBar />
        <div className="background">
        <Content>
            
    <div className="redone">
    
        </div>
    <div className="blueone">
        <ul>
            <li>Rạp số: 1</li>
            <li>Tên Phim: Siêu nhân Gao</li>
            <li>Suất chiếu: 20:00 14/12/2023</li>
            <li>Ghế đã chọn: F1, B2, C3</li>
            <li>Giá vé: 210.000 VND</li>
            <li>Combo: Something</li>
            <li className="totalprice">Total: 2.100.000 VND</li>
        </ul>
        <Button className="selectseatbutton" shape="round" icon={<CloseOutlined />} size={10}>Cancel </Button >
        <Button className="selectseatbutton" shape="round" icon={<DoubleRightOutlined />} size={10}>Next </Button >
        
    </div>
    
   </Content>
   </div>
    </Layout>
    
    
  );
} 