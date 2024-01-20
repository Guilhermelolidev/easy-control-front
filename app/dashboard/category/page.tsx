"use client"
import { Row, Col, Breadcrumb, Table, TableProps, Space, Tooltip, Button, Popconfirm, Spin, Alert, Input, Skeleton, Modal } from "antd";
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    SearchOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { Category } from "@/app/types/category";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { deleteCategories, fetchCategories } from "@/app/api/category";
import { useState } from "react";

export default function Page() {
    const [filter, setFilter] = useState('')
    const [rowsToRemove, setRowsToRemove] = useState<Category[]>([])
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleFilterChange = (event: any) => {
        setFilter(event.target.value)
    }

    const { data: categories, isLoading } = useQuery(['categories', filter], () => fetchCategories(filter), {
        refetchOnMount: true
    });

    const deleteMutation = useMutation(deleteCategories, {
        onSuccess: () => {
            toast.success('Category deleted successfully', { position: 'top-center' });
            queryClient.invalidateQueries('categories');
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    function handleDelete(id: number) {
        deleteMutation.mutate([id])
    }

    function handleDeleteAllRows() {
        const ids = rowsToRemove.map(item => item.id)

        deleteMutation.mutate(ids)
        setOpenModalDelete(false)
        setRowsToRemove([])
    }

    const rowSelection = {
        rowsToRemove,
        onChange: (_: any, selectRowsData: Category[]) => {
            setRowsToRemove(selectRowsData)
        }
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
                            <Button type="primary" shape="circle" icon={<EditFilled />} />
                        </Tooltip>
                    </Link>
                    <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={async () => {
                            handleDelete(record.id)
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
                                title: <Link href={'/dashboard'}>Dashboard</Link>
                            },
                            {
                                title: 'Category',
                            },
                        ]}
                    />
                </Col>

                <Col span={24} style={{ marginTop: 20 }}>
                    <Link href="/dashboard/category/create">
                        <Tooltip title="Create new" color="gray">
                            <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" style={{ paddingTop: 9 }} />
                        </Tooltip>
                    </Link>

                    {rowsToRemove.length > 0 && (
                        <Tooltip title="Delete all rows">
                            <Button
                                danger icon={<DeleteFilled />}
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

                <Col span={4}>
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
                        dataSource={categories && categories.map((item: Category) => ({
                            ...item,
                            key: item.id
                        }))}
                        rowSelection={rowSelection}
                        pagination={{
                            pageSize: 7
                        }}
                        loading={isLoading}
                        locale={{ emptyText: 'Nenhum registro cadastrado.' }}
                    />
                </Col>
            </Row>
        </>
    )
}