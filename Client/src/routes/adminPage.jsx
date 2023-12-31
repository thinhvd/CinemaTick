import React, { useState, useEffect } from 'react';
import { useLoaderData, useLocation, useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
    ScheduleOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ContainerOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography, theme, Table, Pagination, Flex } from 'antd';
import AdminTable from '../components/adminTable';
import AdminLoginPage from './adminLoginPage';
import { getData, deleteData, searchData } from '../api/data';
const { Header, Content, Sider } = Layout;

const { Item } = Menu;

const items = [
    { key: '/admin/users', label: 'Users', icon: <UserOutlined /> },
    { key: '/admin/movies', label: 'Movies', icon: <VideoCameraOutlined /> },
    { key: '/admin/shows', label: 'Shows', icon: <ScheduleOutlined /> },
    { key: '/admin/bills', label: 'Bills', icon: <ContainerOutlined /> },
    { key: '/admin', label: 'Logout', icon: <LogoutOutlined /> },
];

const AdminPage = () => {
    const [data, setData] = useState({
        bills: [],
        users: [],
        movies: [],
        shows: [],
    });
    const [page, setPage] = useState({
        users: 1,
        movies: 1,
        shows: 1,
        bills: 1,
    });
    const [isLogin, setLogin] = useState(
        sessionStorage.getItem('is_login') === 'true' ? true : false
    );
    const [searchedData, setSearchedData] = useState([]);

    const navigate = useNavigate();
    let location = useLocation();
    let currentPath = location.pathname.replace('/admin/', '');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (currentPath !== '/admin') {
            getData(currentPath).then((res) => {
                setData({ ...data, [currentPath]: res.items });
            });
        }
    }, [location.pathname]);

    // Logic Function //

    const handleNextClick = () => {
        getData(currentPath, page[currentPath]).then((res) => {
            if (res._links.next) {
                getData(currentPath, page[currentPath] + 1).then((res) => {
                    setPage({ ...page, [currentPath]: page[currentPath] + 1 });
                    setData({ ...data, [currentPath]: res.items });
                });
            }
        });
    };
    const handlePrevClick = () => {
        getData(currentPath, page[currentPath]).then((res) => {
            if (res._links.prev) {
                getData(currentPath, page[currentPath] - 1).then((res) => {
                    setPage({ ...page, [currentPath]: page[currentPath] - 1 });
                    setData({ ...data, [currentPath]: res.items });
                });
            }
        });
    };

    const handleDelete = (id) => {
        const path = currentPath.substring(-1, currentPath.length - 1);
        const newData = data[currentPath].filter((item) => item.id !== id);

        deleteData(path, id);
        setData({ ...data, [currentPath]: newData });
    };

    // todo: update UI upon data update successfully
    const handleUpdate = () => {};

    //todo: render search result
    const handleSearch = async (type, data) => {
        const path = currentPath.substring(-1, currentPath.length - 1);

        const res = await searchData(path, { [type]: data });
        console.log(res);
        setSearchedData(res.items);
        setData({ ...data, [currentPath]: res.items });
    };

    // todo: update UI upon data post successfully
    const handleAdd = () => {};

    const handleSignOut = () => {
        sessionStorage.setItem('is_login', 'false');
        setLogin(false);
        navigate('/');
    };

    return !isLogin ? (
        <AdminLoginPage setLogin={setLogin} />
    ) : (
        <Layout
            style={{
                height: '100vh',
            }}
        >
            <Sider breakpoint='lg' collapsedWidth='0'>
                <Menu
                    onClick={(item) =>
                        item.key !== '/admin' ? navigate(`${item.key}`) : handleSignOut()
                    }
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={[`${location.pathname}`]}
                    items={items}
                ></Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: colorBgContainer,
                        padding: '0 24px 0',
                    }}
                >
                    <Typography.Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: '24px',
                        }}
                    >
                        Admin DashBoard
                    </Typography.Text>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <AdminTable
                            type={currentPath}
                            data={data[`${currentPath}`]}
                            onNextClick={handleNextClick}
                            onPrevClick={handlePrevClick}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            onSearch={handleSearch}
                        />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminPage;
