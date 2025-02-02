import React from 'react';
import { Card, Form } from 'antd';
import { BaseButton, BaseInput, BaseTitle } from '../../../components';
import { Link } from 'react-router-dom';
import useConnect from './connect';
import { Paths } from '../../../routers/paths';

type FieldType = {
    login?: string;
    password?: string;
    fullName?: string;
};



const Index: React.FC = () => {
    const { onFinishFailed, onSubmit ,contextHolder} = useConnect();
    return <Card
        title={null}
        bordered={false}
        className='rounded-[2px]'
        style={{ width: 400 }}>
        <BaseTitle>Регистрация </BaseTitle>
        {contextHolder}
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

        >
            <Form.Item<FieldType>
                name="fullName"
                rules={[{ required: true, message: '' }]}
            >
                <BaseInput label='Ф.И.О ' className='mt-5' placeholder='Введите Ф.И.О' />
            </Form.Item>
            <Form.Item<FieldType>
                name="login"
                rules={[{ required: true, message: '' }]}
            >
                <BaseInput label='Логин ' placeholder='Введите логин ' />
            </Form.Item>

            <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: '' }]}
            >
                <BaseInput label='Пароль ' placeholder='Введите пароль ' />
            </Form.Item>
            <Link to={Paths.SIGN_IN} className='text-[#1890FF] text-[14px] font-[400] font-[Roboto]'>Вход </Link>
            <hr className='ml-[-25px] mr-[-25px] mt-3' />
            <Form.Item label={null} className='flex justify-center mt-3 '>
                <BaseButton type='primary'  >Регистрировать</BaseButton>
            </Form.Item>
        </Form>
    </Card>
};

export default Index;