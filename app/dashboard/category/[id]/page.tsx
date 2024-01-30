"use client"
import { Breadcrumb, Col, Row, Spin } from "antd";
import Link from "next/link";
import { Category } from "@/app/types/category";
import { notFound } from "next/navigation";
import FormCategory from "../form";
import useCategory from "@/app/hooks/useCategory";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const { queryResultWidthId: { data: category, isLoading, isError } } = useCategory({
        id
    })

    const { updateMutation: { mutate } } = useCategory({})

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