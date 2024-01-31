'use client';
import {
    Row,
    Col,
    Breadcrumb,
    Table,
    TableProps,
    Space,
    Tooltip,
    Button,
    Popconfirm,
    Spin,
    Alert,
    Input,
    Skeleton,
    Modal,
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Category } from '@/app/types/category';
import { useState } from 'react';
import useCategory from '@/app/hooks/useCategory';

export default function Page() {
    const [filter, setFilter] = useState('');
    const [rowsToRemove, setRowsToRemove] = useState<Category[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

    const { queryResultWithFilter, deleteMutation } = useCategory({
        filter,
        queryResultWithFilterEnabled: true,
    });

    const { data: categories, isLoading } = queryResultWithFilter;

    const handleFilterChange = (event: any) => {
        setFilter(event.target.value);
    };

    function handleDelete(id: number) {
        deleteMutation.mutate([id]);
    }

    function handleDeleteAllRows() {
        const ids = rowsToRemove.map((item) => item.id);

        deleteMutation.mutate(ids);
        setOpenModalDelete(false);
        setRowsToRemove([]);
    }

    const rowSelection = {
        rowsToRemove,
        onChange: (_: any, selectRowsData: Category[]) => {
            setRowsToRemove(selectRowsData);
        },
    };

    const columns: TableProps<Category>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Link href={`/dashboard/category/${record.id}`}>
                        <Tooltip title="Edit" color="gray">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<EditFilled />}
                            />
                        </Tooltip>
                    </Link>
                    <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={async () => {
                            handleDelete(record.id);
                        }}
                    >
                        <Button danger shape="circle" icon={<DeleteFilled />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row gutter={[10, 15]}>
                <Col span={24}>
                    <h1 style={{ color: '#1f2d42' }}>Category</h1>
                </Col>
                <Col span={24}>
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <Link href={'/dashboard'}>Dashboard</Link>
                                ),
                            },
                            {
                                title: 'Category',
                            },
                        ]}
                    />
                </Col>

                <Col span={24} style={{ marginTop: 20 }}>
                    <Link href="/dashboard/category/create">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                        >
                            Create
                        </Button>
                    </Link>

                    {rowsToRemove.length > 0 && (
                        <Tooltip title="Delete all rows">
                            <Button
                                danger
                                icon={<DeleteFilled />}
                                shape="circle"
                                size="large"
                                style={{ paddingTop: 9, marginLeft: 30 }}
                                onClick={() => setOpenModalDelete(true)}
                            />
                        </Tooltip>
                    )}
                    <Modal
                        title="Are you sure do you want to delete the following categories?"
                        open={openModalDelete}
                        onOk={handleDeleteAllRows}
                        onCancel={() => setOpenModalDelete(false)}
                    >
                        {rowsToRemove.map((row: Category) => (
                            <p>{`* ${row.name}`}</p>
                        ))}
                    </Modal>
                </Col>

                <Col span={4} style={{ marginTop: 20 }}>
                    <Input
                        type="text"
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Search..."
                        addonBefore={<SearchOutlined />}
                    />
                </Col>

                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={
                            categories &&
                            categories.map((item: Category) => ({
                                ...item,
                                key: item.id,
                            }))
                        }
                        rowSelection={rowSelection}
                        pagination={{
                            pageSize: 7,
                        }}
                        loading={isLoading}
                        locale={{ emptyText: 'Nenhum registro cadastrado.' }}
                    />
                </Col>
            </Row>
        </>
    );
}
