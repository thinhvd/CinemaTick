import { Form, Button, message, Input, InputNumber, Flex, Space, DatePicker } from 'antd';
import { useState } from 'react';
import { addData } from '../api/data';
import background from '../images/background.jpg';

const { Item } = Form;

const movieItems = [
    {
        name: 'name',
        label: 'Name',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'string' }],
        placeholder: 'Name',
    },
    {
        name: 'description',
        label: 'Description',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'string' }],
        placeholder: 'Description',
    },
    {
        name: 'poster',
        label: 'Poster',
        rules: [
            { required: true, message: 'This field is required!' },
            { type: 'url', message: 'Invalid url!' },
            { type: 'string' },
        ],
        placeholder: 'Poster',
    },
    {
        name: 'duration',
        label: 'Duration',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'integer' }],
        placeholder: 'Duration',
    },
    {
        name: 'genre',
        label: 'Genre',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'string' }],
        placeholder: 'Genre',
    },
];

const showItems = [
    {
        name: 'movie_id',
        label: 'Movie ID',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'integer' }],
        placeholder: 'Movie Id',
    },
    {
        name: 'room_id',
        label: 'Room ID',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'integer' }],
        placeholder: 'Room Id',
    },
    {
        name: 'schedule',
        label: 'Schedule',
        rules: [
            { required: true, message: 'This field is required!' },
            { type: 'date', message: 'Not in correct date' },
        ],
        placeholder: 'Schedule',
    },
    {
        name: 'ticket_cost',
        label: 'Ticket cost',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'integer' }],
        placeholder: 'Ticket Cost',
    },
];

const FormAdd = ({ onBlur, type = '' }) => {
    const [form] = Form.useForm();
    const path = type.substring(-1, type.length - 1);
    const [date, setDate] = useState('');

    const onFinish = async (values) => {
        // TODO call api post on success
        // todo: format datetime and pack before add

        // const { $y: year, $H: hour, $D: day, $m: minute, $d } = values.schedule;
        // const month = $d.getMonth() + 1;
        // console.log(`${year}/${month}/${day} ${hour}:${minute}:00`);
        const result = await addData(
            path,
            type !== 'shows' ? values : { ...values, schedule: date }
        );
        result ? message.success('Submit success!') : message.error('Submit failed!');
    };
    // 2024/12/31 21:05:16

    const onFinishFailed = () => {
        // TODO throw err on post failed
        message.error('Submit failed!');
    };

    const onChange = (_, dateString) => {
        setDate(dateString);
    };

    return (
        <Flex
            style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}
            onClick={onBlur}
        >
            <Form
                style={{
                    backgroundImage: `url(${background})`,
                    padding: 24,
                    boxShadow: '0 0 1px #fff',
                    height: 'fit-content',
                    minWidth: 350,
                }}
                onClick={(e) => e.stopPropagation()}
                form={form}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {(type === 'movies' ? movieItems : showItems).map((item, _) => (
                    <Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
                        {item.rules[1]?.type === 'integer' ? (
                            <InputNumber
                                style={{ width: '100%' }}
                                controls={false}
                                placeholder={item.placeholder}
                            />
                        ) : item.rules[1]?.type === 'string' ? (
                            <Input placeholder={item.placeholder} />
                        ) : item.rules[1]?.type === 'date' ? (
                            <DatePicker
                                showTime={{ format: 'HH:mm' }}
                                format='YYYY/MM/DD HH:mm:ss'
                                onChange={onChange}
                            />
                        ) : item.rules[1]?.type === 'url' ? (
                            <Input placeholder={item.placeholder} />
                        ) : null}
                    </Item>
                ))}
                <Item style={{ margin: 0 }}>
                    <Space size={'large'}>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                        <Button onClick={onBlur}>Close</Button>
                    </Space>
                </Item>
            </Form>
        </Flex>
    );
};

export default FormAdd;
