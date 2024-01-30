"use client"
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import FormTransaction from "../form";
import { TransactionsFormData } from "@/app/types/transactions";
import useTransaction from "@/app/hooks/useTransaction";

export default function Page() {

    const { createMutation: { mutate, isLoading } } = useTransaction({})

    async function onSubmit(values: TransactionsFormData) {
        mutate(values)
    }

    return (
        <>
            <Row gutter={[10, 15]}>
                <Col span={24}>
                    <h1>Transactions</h1>
                </Col>
                <Col span={24}>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link href={'/dashboard'}>Dashboard</Link>
                            },
                            {
                                title: <Link href={'/dashboard/transactions'}>Transactions</Link>
                            },
                            {
                                title: 'New Transaction'
                            },
                        ]}
                    />
                </Col>

                <Col span={24}>
                    <FormTransaction onSubmit={onSubmit} isLoading={isLoading} />
                </Col>
            </Row>
        </>
    )
}