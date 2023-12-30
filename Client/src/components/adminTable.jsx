import { Table, Flex, Button, Popconfirm, Input, Form } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import FormAdd from './formAdd';

const { Search } = Input;

const columnsMovie = [
    {
        title: 'ID',
        dataIndex: 'id',
        width: '3%',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
    },
    {
        title: 'Poster',
        dataIndex: 'poster',
        key: 'poster',
        ellipsis: true,
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
            <Flex gap={24}>
                <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.id)}>
                    <a>Delete</a>
                </Popconfirm>
                <a>Edit</a>
            </Flex>
        ),
    },
];

const columnsUser = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Full Name',
        dataIndex: 'fullname',
        key: 'fullname',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
            <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.id)}>
                <a>Delete</a>
            </Popconfirm>
        ),
    },
];

const columnsShow = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Movie ID',
        dataIndex: 'movie_id',
        key: 'movie_id',
    },
    {
        title: 'Room ID',
        dataIndex: 'room_id',
        key: 'room_id',
    },
    {
        title: 'Schedule',
        dataIndex: 'schedule',
        key: 'schedule',
    },
    {
        title: 'Ticket cost',
        dataIndex: 'ticket_cost',
        key: 'ticket_cost',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
            <Popconfirm
                title='Sure to delete?'
                onConfirm={() => {
                    handleDelete(record.id);
                }}
            >
                <a>Delete</a>
            </Popconfirm>
        ),
    },
];

let handleDelete;

const AdminTable = ({
    rowSelection,
    data,
    type = 'users',
    onPrevClick,
    onNextClick,
    onDelete,
    onUpdate,
    onSearch,
}) => {
    let columns;
    handleDelete = onDelete;
    const [isFormOpen, setFormOpen] = useState(false);

    switch (type) {
        case 'users':
            columns = columnsUser;
            break;
        case 'movies':
            columns = columnsMovie;
            break;
        case 'shows':
            columns = columnsShow;
            break;
        default:
            break;
    }

    return (
        <Flex vertical justify='space-between'>
            <Flex justify='space-between'>
                <Search
                    placeholder='Input search text'
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 300, marginBottom: 24 }}
                />
                {type == 'shows' || type == 'movies' ? (
                    <div className='AddNewItem' ><Button icon={<PlusOutlined />} onClick={() => setFormOpen(!isFormOpen)}>
                        Add new item
                    </Button></div>
                ) : null}
            </Flex>

            <Table
                pagination={false}
                bordered
                size='small'
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                loading={data == null ? true : false}
                style={{ flexBasis: 435 }}
            />
            <Flex
                align='center'
                justify='center'
                gap={10}
                style={{
                    marginTop: 24,
                }}
            >
                <Button onClick={onPrevClick} size='large' type='primary'>
                    Prev
                </Button>
                <Button onClick={onNextClick} size='large' type='primary'>
                    Next
                </Button>
            </Flex>

            {isFormOpen && <FormAdd onBlur={() => setFormOpen(!isFormOpen)} type={type} />}
        </Flex>
    );
};

export default AdminTable;
