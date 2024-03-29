"use client"
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import { CategoryFormData } from "@/app/types/category";
import FormCategory from "../form";
import useCategory from "@/app/hooks/useCategory";
import toast from "react-hot-toast";

export default function Page() {
    const { createMutation } = useCategory({})

    const { mutate, isLoading } = createMutation

    function onSubmit(values: CategoryFormData) {
        toast.loading("Creating...", { id: "1" });
        const { categories } = values
        mutate(categories)
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
                                title: 'New Category'
                            },
                        ]}
                    />
                </Col>

                <Col span={24}>
                    <FormCategory onSubmit={onSubmit} isLoading={isLoading} />
                </Col>
            </Row>
        </>
    )
}