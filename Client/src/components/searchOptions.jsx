import React, { useState } from 'react';
import { Radio, Space } from 'antd';

const SearchOptions = ({ type, searchOption, onChange }) => {
    return (
        <>
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
        </>
    );
};

export default SearchOptions;
