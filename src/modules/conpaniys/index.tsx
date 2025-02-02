import React from 'react';
import { Dropdown, Pagination, Popconfirm, Table } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, LogoutOutlined, MoreOutlined } from '@ant-design/icons';
import { BaseButton, BaseModal } from '../../components';
import useConnect from './connect';
import { Paths } from '../../routers/paths';
import { useNavigate } from 'react-router-dom';

interface DataType {
    key: string;
    name: string;
    count: number;
}

const Index: React.FC = () => {
    const {
        data,
        form,
        isEdit,
        setIsEdit,
        isEditModalOpen,
        handleEditOk,
        pagination,
        handleEditCancel,
        selectedRecord,
        isLoading,
        showEditModal,
        showDeleteModal,
        handleDeleteOk,
        contextHolder,
        setPagination, 
    } = useConnect();

    const navigate = useNavigate();

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Названия компании',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Количество сотрудников',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '',
            width: 100,
            key: 'action',
            render: (_, record) => (
                <Dropdown
                    overlayClassName='bg-white'
                    menu={{
                        items: [
                            {
                                label: 'Изменить',
                                key: '1',
                                icon: <EditOutlined />,
                                onClick: (e) => {
                                    showEditModal(data?.find((item: any) => item.id === (record as any)?.id));
                                    setIsEdit(true);
                                },
                            },
                            {
                                label: (
                                    <Popconfirm

                                        title="Вы хотите удалить? "
                                        okText="Да"
                                        cancelText="Нет"
                                        onConfirm={() => handleDeleteOk()}
                                    >
                                        <span className="">Удалить</span>
                                    </Popconfirm>
                                ),
                                key: '2',
                                icon: <DeleteOutlined />,
                                danger: true,
                                onClick: () => showDeleteModal(record),
                            }
                        ]
                    }}
                    trigger={['click']}
                >
                    <MoreOutlined style={{ cursor: 'pointer' }} />
                </Dropdown>
            ),
        }
    ];
    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination({ ...pagination, PageIndex: page, PageSize: pageSize });
    };

    return (
        <div className='w-full'>
            {contextHolder}
            <div className='px-5 flex items-center justify-between bg-[#313131] h-[50px]'>
                <h1 className='text-white font-[700] text-[20px] line-height-[22px] '>Компании</h1>
                <div className='flex items-center'>
                    <LogoutOutlined
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate(Paths.SIGN_IN);
                        }}
                        className='text-white text-[30px] cursor-pointer rotate-180'
                    />
                    <BaseButton
                        onClick={() => {
                            showEditModal({ id: '', name: '', count: 0 });
                            setIsEdit(false);
                        }}
                        className='ml-2 bg-[#08979C]'
                        type='primary'
                    >
                        Добавить компанию
                    </BaseButton>
                </div>
            </div>
            <div className='w-full p-4'>
                <Table<DataType>
                    className='border border-gray-300 rounded '
                    columns={columns}
                    dataSource={data?.map((item: any) => ({ ...item, count: item.count + ' человек' }))}
                    pagination={false}
                    loading={isLoading}

                // scroll={{ y: window.innerHeight - 200 }}
                />
                <div className='flex justify-end mt-4'>
                    {pagination.TotalCount >= 10 &&
                        <Pagination
                            current={pagination.PageIndex}
                            pageSize={pagination.PageSize}
                            total={pagination.TotalCount}
                            showSizeChanger
                            onChange={handlePaginationChange}
                            pageSizeOptions={['5', '10', '25']}
                        />
                    }
                </div>
                <BaseModal
                    isEdit={isEdit}
                    form={form}
                    isEditModalOpen={isEditModalOpen}
                    handleEditOk={handleEditOk}
                    handleEditCancel={handleEditCancel}
                    initialValues={isEdit ? selectedRecord ?? { name: '', count: 0 } : { name: '', count: 0 }}
                />
            </div>
        </div>
    );
};

export default Index;
