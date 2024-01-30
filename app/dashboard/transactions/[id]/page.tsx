"use client"
import { TransactionsFormData } from "@/app/types/transactions";
import { Breadcrumb, Col, Row, Spin } from "antd";
import Link from "next/link";
import { notFound } from "next/navigation";
import FormTransaction from "../form";
import useTransaction from "@/app/hooks/useTransaction";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id

    const { queryResultWithId: { data, isLoading, isError } } = useTransaction({
        id,
        queryResultWithIdEnabled: true
    })

    const { updateMutation: { mutate, isLoading: isLoadingUpdating } } = useTransaction({})

    function onSubmit(values: TransactionsFormData) {
        mutate({ id: Number(id), data: values })
    }

    if (isLoading) {
        return <Spin />
    }

    if (isError) {
        notFound()
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
                                title: 'Edit Transaction'
                            },
                        ]}
                    />
                </Col>

                <Col span={24}>
                    <FormTransaction
                        onSubmit={onSubmit}
                        formData={data}
                        isLoading={isLoadingUpdating}
                    />
                </Col>
            </Row>
        </>
    )
}