"use client"
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { createCategory } from "@/app/api/category";
import { CategoryFormData } from "@/app/types/category";
import { useRouter } from "next/navigation";
import FormCategory from "../form";
import toast from "react-hot-toast";

export default function Page() {
    const queryClient = useQueryClient();
    const { push } = useRouter()

    const { mutate, isLoading } = useMutation(createCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            toast.success('Category created successfully!', { position: 'top-center' })
            push('/dashboard/category')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    function onSubmit(values: CategoryFormData) {
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