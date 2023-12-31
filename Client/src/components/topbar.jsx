import { Layout, Image, Row, Col, Card,} from "antd";
import { Header } from "antd/es/layout/layout";
import MenuMovie from "./menu";
import Cinematick from '../images/Cinematick.png';
import UserButton from "./user";

export default function TopBar() {

    return (
        <Layout>
            <Header style={{
                margin: '0', padding: '0',
                minWidth: '100%',
                height: '5.1vw',
                backgroundColor: '#1f2833',
                position: "fixed", 
                zIndex: 1000,

            }}
            >
                <Row gutter={[16, 8]}>
                    <Col span={8}>
                        <Card
                            style={{
                                width: '5vw',
                                height: '5vw',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                border:'none'
                            }}>
                            <MenuMovie/>
                        </Card>
                    </Col>

                    <Col span={8} className="logo">
                        <a onClick={"http://fall2324w20g8.int3306.freeddns.org/"}>
                            <Image
                                className="logoweb"
                                src={Cinematick}
                                preview={false}
                            />
                        </a>
                    </Col>

                    <Col span={8} style={{ textAlign: 'right', paddingRight: '2vw', paddingTop: '1vw' }}>
                        <UserButton/>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}
