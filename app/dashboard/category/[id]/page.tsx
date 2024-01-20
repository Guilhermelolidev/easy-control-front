"use client"
import { Breadcrumb, Col, Row, Spin } from "antd";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { findCategory, udpateCategory } from "@/app/api/category";
import { Category } from "@/app/types/category";
import toast from "react-hot-toast";
import { notFound, useRouter } from "next/navigation";
import FormCategory from "../form";

export default function Page({ params }: { params: { id: string } }) {
    const queryClient = useQueryClient();
    const { push } = useRouter()
    const id = params.id;

    const { data: category, isLoading, isError } = useQuery(['category', id], () => findCategory(Number(id)))

    const { mutate } = useMutation(udpateCategory, {
        onSuccess: () => {
            toast.success('Category updated successfully!', { position: 'top-center' });
            queryClient.invalidateQueries('category')
            push('/dashboard/category')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    function onSubmit(values: Omit<Category, 'id'>) {
        const { name } = values
        mutate({ id: Number(id), name })
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
                    <h1>Category</h1>
                </Col>
                <Col span={24}>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link href={'/dashboard'}>Dashboard</Link>
                            },
                            {
                                title: <Link href={'/dashboard/category'}>Category</Link>
                            },
                            {
                                title: 'Edit category'
                            },
                        ]}
                    />
                </Col>

                <Col span={24}>
                    <FormCategory onSubmit={onSubmit} isLoading={isLoading} formData={category} />
                </Col>
            </Row>
        </>
    )
}