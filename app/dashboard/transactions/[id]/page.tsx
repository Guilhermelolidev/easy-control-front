"use client"
import { findTransaction, updateTransaction } from "@/app/api/transactions";
import { TransactionsFormData } from "@/app/types/transactions";
import { Breadcrumb, Col, Row, Spin } from "antd";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import FormTransaction from "../form";

export default function Page({ params }: { params: { id: string } }) {
    const queryClient = useQueryClient();
    const { push } = useRouter()
    const id = params.id

    const { data, isLoading, isError } = useQuery(['transaction', id], () => findTransaction(Number(id)))

    console.log(data)

    const { mutate, isLoading: isLoadingUpdating } = useMutation(updateTransaction, {
        onSuccess: () => {
            toast.success('Transaction updated successfully!', { position: 'top-center' });
            queryClient.invalidateQueries('transactions')
            queryClient.invalidateQueries('transaction')
            push('/dashboard/transactions')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

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