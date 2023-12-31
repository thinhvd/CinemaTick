import { Table, Flex } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryTable = ({ rowSelection }) => {
    const [data, setData] = useState([
        // {
        //     key:'1',
        //     name: 'A',
        //     schedule: '12:00:00',
        //     num_of_tickets: '4',
        //     total_price: '123000',
        //     bill_code: 'ASDFGH',
        // },
        // Add more data entries as needed
    ]);
    const token = localStorage.getItem('token');

    function fetchHistoryInfo() {
        axios({
            method: "GET",
            url: "http://fall2324w20g8.int3306.freeddns.org/api/bill/history/user",
            headers: {
              Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                const historyData = response.data;
                setData(historyData);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchHistoryInfo();
    }, []);

    const columnsHistory = [
        {
            title: 'Movie',
            dataIndex: 'movie_name',
            key: 'name',
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            key: 'schedule',
        },
        {
            title: 'Number of Tickets',
            dataIndex: 'num_of_tickets',
            key: 'num_of_tickets',
        },
        {
            title: 'Price',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'Code',
            dataIndex: 'bill_code',
            key: 'bill_code',
        },
    ];

    return (
        <Flex vertical justify='space-between'>
            <Table
                pagination={false}
                bordered
                size='small'
                rowSelection={rowSelection}
                columns={columnsHistory}
                dataSource={data}
                loading={data.length === 0}
                className='historyTable'
            />
        </Flex>
    );
};

export default HistoryTable;
