import { Layout, Image, Row, Col, Card, Button, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuOutlined } from '@ant-design/icons';
import MenuMovie from "./menu";

export default function TopBar() {
    return (
        <Layout>
            <Header style={{
                margin: '0', padding: '0',
                minWidth: '100%',
                height: '10vh',
                backgroundColor: '#1f2833',
                position: 'fixed',

            }}
            >
                <Row gutter={[16, 8]}>
                    <Col span={8}>
                        <Card
                            style={{
                                width: '10vh',
                                height: '10vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                border: 'none'
                            }}>
                            <MenuMovie/>
                        </Card>
                    </Col>

                    <Col span={8} className="logo">
                        <a href={`/`}>
                            <Image
                                src="/src/images/Cinematick.png"
                                preview={false}
                            />
                        </a>
                    </Col>

                    <Col span={8} style={{ textAlign: 'right', paddingRight: '30px', paddingTop: '15px' }}>
                        <Space size='middle'>
                            <Button className="buttonstyle" href={`/login`}>
                                Log in
                            </Button>
                            <Button className="buttonstyle" href={`/signup`}>
                                Sign up
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}
