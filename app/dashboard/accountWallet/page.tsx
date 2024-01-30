"use client"
import { Breadcrumb, Button, Col, Modal, Row, Spin, Table, TableColumnsType, Typography } from "antd";
import useAccountWallet from "@/app/hooks/useAccountWallet";
import { AccountWallet } from "@/app/types/accountWallet";
import { useState } from "react";
import { Transactions } from "@/app/types/transactions";
import useTransaction from "@/app/hooks/useTransaction";
import { formatMoney } from "@/app/utils/convertions";
import Link from "next/link";
import { DeleteFilled } from '@ant-design/icons';
import AddAccountWallet from "@/app/ui/components/buttons/AddAccountWalet";
import CardAccountWallet from "@/app/ui/components/cards/CardAccountWallet";
import CardAccountInfo from "@/app/ui/components/cards/CardAccountInfo";

const { Text } = Typography

export default function AccountWallet() {
    const [idSelected, setIdSelected] = useState<number>()
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const {
        queryResult: { data: accountWallets, isLoading: isLoadingAccountWallet },
        queryResultWithId: { isLoading, data: accountWallet },
        deleteMutation
    } = useAccountWallet({
        queryResultEnabled: true,
        queryResultWithIdEnabled: !!idSelected,
        id: idSelected,
        setIdSelected
    })

    const { queryResultWithFilter: { data: transactions, isLoading: isLoadingTransactions } } = useTransaction({
        accountWalletId: idSelected,
        queryResultWithFilterEnabled: true
    })

    if (isLoadingAccountWallet || isLoadingTransactions || isLoading) {
        return <Spin />
    }

    const handleDeleteAccount = () => {
        deleteMutation.mutate(accountWallet?.id)
        setOpenModalDelete(false)
    }

    const handleShowAccountWallet = (id?: number) => {
        if (id) {
            setIdSelected(id)
        }
    }

    const columns: TableColumnsType<Transactions> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 350,
        },
        {
            title: 'Value',
            dataIndex: 'value',
            render: (_, record: Transactions) => (
                <Text strong type={record.type === 'REVENUE' ? 'success' : 'danger'}>
                    {formatMoney(Number(record.value))}
                </Text>
            )
        }
    ];

    return (
        <>
            <Row style={{ paddingBottom: 30 }}>
                <Col span={8}>
                    <Row gutter={[10, 15]}>
                        <Col span={24}>
                            <h1 style={{ color: '#1f2d42' }}>Account and wallet</h1>
                        </Col>
                        <Col span={24}>
                            <Breadcrumb
                                items={[
                                    {
                                        title: <Link href={'/dashboard'}>Dashboard</Link>
                                    },
                                    {
                                        title: 'Account and wallet',
                                    },
                                ]}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row style={{ marginTop: 20 }}>
                                <Col>
                                    <AddAccountWallet href="/dashboard/accountWallet/create?type=account" />
                                </Col>

                                <Col style={{ marginLeft: 10 }}>
                                    <AddAccountWallet text="Add wallet" isWallet href="/dashboard/accountWallet/create?type=wallet" />
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 30 }}>
                                <Col>
                                    {accountWallets ? accountWallets.map((item: AccountWallet) => (
                                        <CardAccountWallet
                                            item={item}
                                            onClick={() => handleShowAccountWallet(item.id)}
                                            isSelected={item.id === idSelected}
                                            key={item.id}
                                        />
                                    )) : (
                                        <Typography>No account or wallet registered</Typography>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col span={10}>
                    {idSelected && (
                        <>
                            <Row>
                                {isLoading ? (
                                    <Spin />
                                ) : (
                                    <>
                                        {accountWallet && (
                                            <CardAccountInfo accountWallet={accountWallet} />
                                        )}
                                    </>
                                )}
                                <Button
                                    danger
                                    type="primary"
                                    icon={<DeleteFilled />}
                                    size='large'
                                    style={{ marginLeft: 20 }}
                                    onClick={() => setOpenModalDelete(true)}
                                >
                                    Delete
                                </Button>
                                <Modal
                                    title={`Are you sure do you want to delete ${accountWallet?.account_name} ?`}
                                    open={openModalDelete}
                                    onOk={handleDeleteAccount}
                                    onCancel={() => setOpenModalDelete(false)}
                                >
                                    This action is irreversible
                                </Modal>
                            </Row>

                            <Row style={{ marginTop: 30 }}>
                                <Table
                                    columns={columns}
                                    loading={isLoadingTransactions}
                                    dataSource={transactions}
                                    pagination={false}
                                    scroll={{ y: 300 }}
                                    locale={{ emptyText: 'No transactions.' }}
                                />
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </>
    )
}