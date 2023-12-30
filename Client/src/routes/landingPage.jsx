import List from '../components/list';
import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import Advertisment from '../components/advertisement';

export default function LandingPage() {
  return (
    <Layout className="background">
        <TopBar />
      <Content className='list'>
        <Advertisment/>
        <List />
      </Content>
      <Footer className="aboutus">
        <h1>ABOUT US</h1>
      </Footer>
    </Layout>  
  );
}