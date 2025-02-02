import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { BaseButton } from '..';

type Props = {
    isEditModalOpen: boolean;
    handleEditOk: (e: React.MouseEvent) => void;
    handleEditCancel: () => void;
    form: any;  
    isEdit?: boolean;
    initialValues?: { id?: string; name?: string; count?: number };
};

function Index({
    isEditModalOpen,
    handleEditOk,
    handleEditCancel,
    form,
    isEdit = true,
    initialValues,
}: Props) {
    const [values, setValues] = useState<any>({
        name: '',
        count: 0,
        id: '',
    });

    // `initialValues` o'zgarganda `values` ni yangilash
    useEffect(() => {
        if (initialValues?.id) {
            setValues(initialValues);
            form.setFieldsValue({
                name: initialValues.name || '', 
                count: initialValues.count || 0, 
            });
        } else {
            setValues({ name: '', count: 0, id: '' });
            form.resetFields(); 
        }
    }, [initialValues, form]);

    return (
        <Modal
            title={isEdit ? 'Изменить компанию' : 'Добавить компанию'}
            open={isEditModalOpen}
            onOk={handleEditOk}
            onCancel={handleEditCancel}
            footer={null}
        >
            <Form form={form} layout="vertical">
                <hr className="my-5 mx-[-25px]" />
                
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Пожалуйста, введите название компании!' }]}
                >
                    <div className="flex justify-between">
                        <p>Названия компании</p>
                        <Input
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            placeholder="Введите название"
                            className="w-[300px]"
                        />
                    </div>
                </Form.Item>

                <Form.Item
                    name="count"
                    rules={[{ required: true, message: 'Пожалуйста, введите количество сотрудников!' }]}
                >
                    <div className="flex justify-between">
                        <p>Количество сотрудников</p>
                        <Input
                            type="number"
                            value={values.count}
                            onChange={(e) => setValues({ ...values, count: Number(e.target.value) })}
                            placeholder="Введите количество"
                            className="w-[300px]"
                        />
                    </div>
                </Form.Item>

                <hr className="my-5 mx-[-25px]" />

                <Form.Item className="flex justify-center">
                    <BaseButton
                        className="bg-[#1890FF]"
                        type="primary"
                        onClick={handleEditOk}
                    >
                        {isEdit ? 'Изменить компанию' : 'Добавить компанию'}
                    </BaseButton>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default Index;
