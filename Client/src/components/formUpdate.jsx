import { Form, Flex, Space, Button, message, Input, InputNumber, DatePicker } from 'antd';
import React from 'react';
import { updateMovie } from '../api/data';
import background from '../images/background.jpg';

const { Item } = Form;

const movieItems = [
    {
        name: 'name',
        label: 'Name',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'string' }],
        placeholder: 'placeholder',
    },
    {
        name: 'description',
        label: 'Description',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'string' }],
        placeholder: 'placeholder',
    },
    {
        name: 'poster',
        label: 'Poster',
        rules: [
            { required: true, message: 'This field is required!' },
            { type: 'url', message: 'Invalid url!' },
            { type: 'string' },
        ],
        placeholder: 'placeholder',
    },
    {
        name: 'duration',
        label: 'Duration',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'integer' }],
        placeholder: 'placeholder',
    },
    {
        name: 'genre',
        label: 'Genre',
        rules: [{ required: true, message: 'This field is required!' }, { type: 'string' }],
        placeholder: 'placeholder',
    },
];

const FormUpdate = ({ onBlur, type = 'movies', formData }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const result = await updateMovie({ ...values, id: formData['id'] });
        result ? message.success('Submit success!') : message.error('Submit failed!');
    };

    const onFinishFailed = () => {
        // TODO throw err on post failed
        message.error('Submit failed!');
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
                    backgroundSize:'cover',
                    padding: 24,
                    boxShadow: '0 0 1px #fff',
                    height: 'fit-content',
                    minWidth: 350,
                    borderRadius:'2vh',
                    borderColor:'#000000',
                    border:'solid'
                }}
                initialValues={{
                    ...formData,
                }}
                onClick={(e) => e.stopPropagation()}
                form={form}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {movieItems.map((item, _) => (
                    <Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
                        {item.rules[1]?.type === 'integer' ? (
                            <InputNumber
                                style={{ width: '100%' }}
                                controls={false}
                                placeholder={item.placeholder}
                            />
                        ) : item.rules[1]?.type === 'string' ? (
                            <Input placeholder={item.placeholder} />
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

export default FormUpdate;
