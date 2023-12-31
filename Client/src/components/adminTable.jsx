import { useState } from 'react';

import { Table, Flex, Button, Popconfirm, Input, Radio, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import FormAdd from './formAdd';
import FormUpdate from './formUpdate';
import SearchOptions from './searchOptions';

const { Search } = Input;

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
    const handleDelete = onDelete;
    const handleUpdate = onUpdate;
    const [isFormOpen, setFormOpen] = useState(false);
    const [isFormUpdateOpen, setFormUpdateOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [searchOption, setSearchOption] = useState('');

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
                    <Popconfirm
                        title='Sure to edit?'
                        onConfirm={() => {
                            setFormUpdateOpen(true);
                            setFormData(record);
                        }}
                    >
                        <a>Edit</a>
                    </Popconfirm>
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
            title: 'Movie Name',
            dataIndex: 'movie_name',
            key: 'movie_name',
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

    const columnsBill = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Bill Code',
            dataIndex: 'bill_code',
            key: 'bill_code',
        },
        {
            title: 'Movie Name',
            dataIndex: 'movie_name',
            key: 'movie_name',
        },
        {
            title: 'Number of tickets',
            dataIndex: 'num_of_tickets',
            key: 'num_of_tickets',
            width: '9%',
        },
        {
            title: 'Positions',
            dataIndex: 'positions',
            key: 'positions',
            width: '20%',
            render: (_, { positions }) => (
                <Flex gap={16}>
                    {positions.map((position, index) => (
                        <p style={{ display: 'inline-block', margin: 0 }} key={index}>
                            {position}
                        </p>
                    ))}
                </Flex>
            ),
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            key: 'schedule',
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
    ];

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
        case 'bills':
            columns = columnsBill;
            break;
        default:
            break;
    }

    const onChange = (e) => {
        setSearchOption(e.target.value);
    };

    return (
        <Flex vertical justify='space-between'>
            <Flex vertical>
                <Flex justify='space-between'>
                    <Search
                        placeholder='Input search text'
                        allowClear
                        onSearch={(value) => onSearch(searchOption, value)}
                        style={{ width: 300, marginBottom: 24 }}
                    />
                    {(type === 'movies' || type === 'shows') && (
                        <div className='AddNewItem' ><Button icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>
                            Add Item
                        </Button></div>
                    )}
                </Flex>
                {type === 'users' && (
                    <Radio.Group
                        style={{ marginBottom: 24 }}
                        defaultValue={'fullname'}
                        onChange={onChange}
                        value={searchOption}
                    >
                        <Space>
                            <Radio value={'fullname'}>Name</Radio>
                            <Radio value={'phone_number'}>Phone</Radio>
                            <Radio value={'email'}>Email</Radio>
                        </Space>
                    </Radio.Group>
                )}
                {type === 'movies' && (
                    <Radio.Group
                        style={{ marginBottom: 24 }}
                        defaultValue={'movie_name'}
                        onChange={onChange}
                        value={searchOption}
                    >
                        <Radio value={'movie_name'}>Name</Radio>
                    </Radio.Group>
                )}
                {type === 'shows' && (
                    <Radio.Group
                        style={{ marginBottom: 24 }}
                        defaultValue={'movie_name'}
                        onChange={onChange}
                        value={searchOption}
                    >
                        <Radio value={'movie_name'}>Movie Name</Radio>
                    </Radio.Group>
                )}
                {type === 'bills' && (
                    <Radio.Group
                        style={{ marginBottom: 24 }}
                        defaultValue={'bill_code'}
                        onChange={onChange}
                        value={searchOption}
                    >
                        <Radio value={'bill_code'}>Bill Code</Radio>
                    </Radio.Group>
                )}
            </Flex>

            <Table
                pagination={false}
                bordered
                size='small'
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
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
            {isFormUpdateOpen && (
                <FormUpdate
                    onBlur={() => setFormUpdateOpen(false)}
                    type={type}
                    formData={formData}
                />
            )}
        </Flex>
    );
};

export default AdminTable;
