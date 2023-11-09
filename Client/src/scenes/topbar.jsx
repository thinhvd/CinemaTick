import { Layout, Image, Row, Col, Card, Button} from "antd";
import { Header} from "antd/es/layout/layout";
import { MenuOutlined } from '@ant-design/icons';
import './topbar.css';

const TopBar = () => {
    return(
        <Layout>
            <Header style={{
                    margin: '0', padding: '0', 
                    minWidth : '100%',
                    height :'10vh', 
                    backgroundColor:'#1f2833', 
                    position:'fixed',
                    
                }}
            >  
                <Row gutter={[16, 8]}>
                    <Col span={8}> 
                        <Card style={{width:'10vh', height:'10vh', display:'flex', alignItems:'center',justifyContent:'center', backgroundColor:'#1f2833', border:'none'}}>
                            <MenuOutlined style={{color:'#c5c6c7', scale:'3'}} /> 
                        </Card>
                    </Col>

                    <Col span={8}> 
                        <a href = 'http://localhost:5173/'>
                            <Image 
                                style={{display:'block', margin:'0 245px'}} 
                                src = "/src/images/Cinematick.png"
                                preview = {false}
                            />
                        </a> 
                    </Col>

                    <Col span={8} style={{textAlign: 'right', paddingRight: '30px', paddingTop: '15px'}}>  
                        <Button>
                            Log in
                        </Button>
                        <Button >
                            Sign up
                        </Button>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}

export default TopBar;
