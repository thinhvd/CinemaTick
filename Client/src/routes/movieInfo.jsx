import React from 'react';
import { Image, Card } from 'antd';
import TopBar from '../components/topbar';
import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";

export default function MovieInfo() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className='background'>
            <TopBar />

                <Image
                    className='movieInfoImage'
                    src = "/src/images/listMovie/1.jpg"
                    preview={false}
                />
        </div>
    );
};