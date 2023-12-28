import List from '../components/list';
import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";

export default function LandingPage() {
  return (
    <Layout><div className="background">
    <Header><TopBar /></Header>
    <Content className="list">
      <List />
    </Content>
    <Footer className="aboutus">
      <h1>ABOUT US</h1>
    </Footer>
  </div></Layout>
      
  );
}