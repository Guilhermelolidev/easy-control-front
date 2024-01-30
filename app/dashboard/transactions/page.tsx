"use client"
import { Breadcrumb, Button, Col, Input, Modal, Popconfirm, Row, Select, Space, Table, TableProps, Tooltip, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import { SearchOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { Category } from "@/app/types/category";
import { Transactions } from "@/app/types/transactions";
import {
    PlusOutlined
} from "@ant-design/icons";
import { formatMoney } from "@/app/utils/convertions";
import { TitleFilters, TitlePage } from "@/app/ui/components/TitlePage";
import Image from "next/image";
import { AccountWallet } from "@/app/types/accountWallet";
import useCategory from "@/app/hooks/useCategory";
import useTransaction from "@/app/hooks/useTransaction";
import useAccountWallet from "@/app/hooks/useAccountWallet";

const { Text } = Typography;

export default function Page() {
    const [description, setDescription] = useState<string>('')
    const [categoryId, setCategoryId] = useState<number>()
    const [accountWalletId, setAccountWalletId] = useState<number>()
    const [rowsToRemove, setRowsToRemove] = useState<Transactions[]>([])
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

    const { deleteMutation } = useTransaction({})

    const { queryResult: { data: categories, isLoading } } = useCategory({
        queryResultEnabled: true
    })

    const { queryResult: { data: accountWallets, isLoading: isLoadingAccountwallets } } = useAccountWallet({
        queryResultEnabled: true
    })

    const { queryResultWithFilter: { data: transactions, isLoading: isLoadingTransactions } } = useTransaction({
        accountWalletId,
        categoryId,
        description,
        queryResultWithFilterEnabled: true
    })

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
            title: 'Account/Wallet',
            key: 'action',
            render: (_, record: any) => (
                <Space size="small" style={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={record.imageAccount} alt="" width={20} height={20} style={{ borderRadius: '50%' }} />
                    <Text>{record.accountWallet}</Text>
                </Space>
            )
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
            <Row gutter={[10, 10]}>
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
            </Row>

            <Row gutter={[10, 15]} style={{ marginTop: 25 }}>
                <Col span={24}>
                    <Link href="/dashboard/transactions/create?type=revenue">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size='large'
                            style={{ backgroundColor: 'green' }}
                        >
                            Revenue
                        </Button>
                    </Link>

                    <Link href="/dashboard/transactions/create?type=expense" style={{ marginLeft: 10 }}>
                        <Button
                            danger
                            type="primary"
                            icon={<PlusOutlined />}
                            size='large'
                        >
                            Expense
                        </Button>
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
            </Row>

            <Row gutter={[10, 15]} style={{ marginTop: 25 }}>
                <Col span={24}>
                    <TitleFilters title="Filters" />
                </Col>
            </Row>

            <Row gutter={[10, 15]} style={{ marginTop: 10 }}>
                <Col>
                    <Input
                        type="text"
                        value={description}
                        onChange={handleFilterChange}
                        placeholder="Search by description..."
                        addonBefore={<SearchOutlined />}
                    />
                </Col>

                <Col>
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
                                <p>No category</p>
                            </div>
                        }
                    />
                </Col>

                <Col>
                    <Select
                        loading={isLoadingAccountwallets}
                        style={{ width: 200 }}
                        value={accountWalletId}
                        onChange={(value: number) => setAccountWalletId(value)}
                        placeholder="select an account or wallet"
                        options={accountWallets && accountWallets.map((item: AccountWallet) => ({
                            value: item.id,
                            label: item.account_name,
                            imageUrl: item.imageUrl
                        }))}
                        optionRender={(option: any) => {
                            return (
                                <Space size="small" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image src={option.data.imageUrl} alt="" width={20} height={20} style={{ borderRadius: '50%' }} />
                                    <Text>{option.label}</Text>
                                </Space>
                            )
                        }}
                        allowClear
                        notFoundContent={
                            <div style={{ padding: 5 }}>
                                <p>No account or wallet</p>
                            </div>
                        }
                    />
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
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
                        loading={categoryId || accountWalletId ? false : isLoadingTransactions}
                        locale={{ emptyText: 'Nenhum registro cadastrado.' }}
                    />
                </Col>
            </Row>
        </>
    )
}