"use client"
import { Breadcrumb, Button, Col, Input, Modal, Popconfirm, Row, Select, Space, Table, TableProps, Tooltip, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import { SearchOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchCategories } from "@/app/api/category";
import { Category } from "@/app/types/category";
import { Transactions } from "@/app/types/transactions";
import { deleteTransaction, fetchTransactions } from "@/app/api/transactions";
import toast from "react-hot-toast";
import {
    PlusOutlined
} from "@ant-design/icons";
import { formatMoney } from "@/app/utils/convertions";
import { TitleFilters, TitlePage } from "@/app/ui/components/TitlePage";

const { Text } = Typography;

export default function Page() {
    const [description, setDescription] = useState<string>('')
    const [categoryId, setCategoryId] = useState<number>()
    const [rowsToRemove, setRowsToRemove] = useState<Transactions[]>([])
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation(deleteTransaction, {
        onSuccess: () => {
            toast.success('Transaction deleted successfully', { position: 'top-center' });
            queryClient.invalidateQueries('transactions');
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    const { data: categories, isLoading } = useQuery('categories', () => fetchCategories(''))

    const { data: transactions, isLoading: isLoadingTransactions } = useQuery(['transactions', description, categoryId], () => fetchTransactions({
        description: description,
        categoryId: categoryId
    }))

    function handleFilterChange(event: any) {
        setDescription(event.target.value)
    }

    function handleDeleteTransaction(id: number) {
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
        onChange: (_: any, selectRowsData: Transactions[]) => {
            setRowsToRemove(selectRowsData)
        }
    };

    const columns: TableProps<Transactions>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (_, record: Transactions) => (
                <Text strong type={record.type === 'REVENUE' ? 'success' : 'danger'}>
                    {formatMoney(Number(record.value))}
                </Text>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Link href={`/dashboard/transactions/${record.id}?type=${record.type === 'REVENUE' ? 'revenue' : 'expense'}`}>
                        <Tooltip title="Edit" color="gray">
                            <Button type="primary" shape="circle" icon={<EditFilled />} />
                        </Tooltip>
                    </Link>

                    <Popconfirm
                        title="Delete transaction"
                        description="Are you sure to delete this transaction?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleDeleteTransaction(record.id)
                        }}
                    >
                        <Button danger shape="circle" icon={<DeleteFilled />} />
                    </Popconfirm>
                </Space >
            ),
        },
    ];

    return (
        <>
            <Row gutter={[10, 15]}>
                <Col span={24}>
                    <TitlePage title="Transactions" />
                </Col>

                <Col span={24}>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link href={'/dashboard'}>Dashboard</Link>
                            },
                            {
                                title: 'Transactions',
                            },
                        ]}
                    />
                </Col>

                <Col span={24} style={{ marginTop: 20 }}>
                    <Link href="/dashboard/transactions/create?type=revenue">
                        <Tooltip title="Create new revenue" color="gray">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<PlusOutlined />}
                                size="large"
                                style={{ paddingTop: 9 }}
                            />
                        </Tooltip>
                    </Link>

                    <Link href="/dashboard/transactions/create?type=expense" style={{ marginLeft: 10 }}>
                        <Tooltip title="Create new expense" color="gray">
                            <Button
                                danger
                                type="primary"
                                shape="circle"
                                icon={<PlusOutlined />}
                                size="large"
                                style={{ paddingTop: 9 }}
                            />
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
                        title="Are you sure do you want to delete the following transactions?"
                        open={openModalDelete}
                        onOk={handleDeleteAllRows}
                        onCancel={() => setOpenModalDelete(false)}
                    >
                        {rowsToRemove.map((row: Transactions) => (
                            <p>{`* ${row.description}`}</p>
                        ))}
                    </Modal>
                </Col>

                <Col span={24}>
                    <TitleFilters title="Filters" />
                </Col>

                <Col span={6}>
                    <Input
                        type="text"
                        value={description}
                        onChange={handleFilterChange}
                        placeholder="Search by description..."
                        addonBefore={<SearchOutlined />}
                    />
                </Col>

                <Col span={12}>
                    <Select
                        loading={isLoading}
                        style={{ width: 200 }}
                        value={categoryId}
                        onChange={(value: number) => setCategoryId(value)}
                        placeholder="select a category"
                        options={categories && categories.map((item: Category) => ({
                            value: item.id,
                            label: item.name
                        }))}
                        allowClear
                        notFoundContent={
                            <div style={{ padding: 5 }}>
                                <p>Sem categorias</p>
                            </div>
                        }
                    />
                </Col>

                <Col span={24}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={transactions && transactions.map((item: Transactions) => ({
                            ...item,
                            key: item.id
                        }))}
                        pagination={{
                            pageSize: 7
                        }}
                        loading={categoryId ? false : isLoadingTransactions}
                        locale={{ emptyText: 'Nenhum registro cadastrado.' }}
                    />
                </Col>
            </Row >
        </>
    )
}