import List from '../components/list';
import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import Advertisment from '../components/advertisement';
import FooterArea from '../components/footer';
import { Space, Typography } from 'antd';

const {Title, Paragraph}= Typography;

export default function LandingPage() {
  return (
    <Layout className="background">
        <TopBar />
      <Content className='list'>
        <Advertisment/>
        <Space style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <Title style={{color:'white'}}>DANH SÁCH PHIM</Title>
        </Space>
        <List />
      </Content>
      <Footer className="aboutus">
        <FooterArea/>
      </Footer>
    </Layout>  
  );
}