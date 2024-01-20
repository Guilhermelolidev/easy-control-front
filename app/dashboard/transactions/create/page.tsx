"use client"
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import FormTransaction from "../form";
import { TransactionsFormData } from "@/app/types/transactions";
import { useMutation, useQueryClient } from "react-query";
import { createTransaction } from "@/app/api/transactions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const queryClient = useQueryClient();
    const { push } = useRouter()

    const { mutate, isLoading } = useMutation(createTransaction, {
        onSuccess: () => {
            toast.success('Transaction created successfully!', { position: 'top-center' });
            queryClient.invalidateQueries('transactions');
            push('/dashboard/transactions')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    function onSubmit(values: TransactionsFormData) {
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