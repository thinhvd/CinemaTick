import List from '../listMovie/list.jsx';
import './mainScreen.css';
import Layout, { Content, Footer, Header} from "antd/es/layout/layout.js";
import TopBar from "../header/topbar.jsx";


const Main = () => {

  return(
    <Layout className="bg">
        <Header style={{padding:'0'}}>  
            <TopBar/>
        </Header>
        <Content className="list">
          <List/>
        </Content>
        <Footer className="aboutus">
          <h1>ABOUT US</h1>
        </Footer>
    </Layout>
      
  )
}

export default Main;
