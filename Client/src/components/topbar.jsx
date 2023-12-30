import { Layout, Image, Row, Col, Card, Button, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import MenuMovie from "./menu";
import Cinematick from '../images/Cinematick.png';
import { useState, useEffect } from "react";
import axios from "axios";
import UserButton from "./user";

export default function TopBar() {

    return (
        <Layout>
            <Header style={{
                margin: '0', padding: '0',
                minWidth: '100%',
                height: '10vh',
                backgroundColor: '#1f2833',
                position: "fixed", 
                zIndex: 1000,

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
                                className="logoweb"
                                src={Cinematick}
                                preview={false}
                            />
                        </a>
                    </Col>

                    <Col span={8} style={{ textAlign: 'right', paddingRight: '2%', paddingTop: '1%' }}>
                        <UserButton/>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}
