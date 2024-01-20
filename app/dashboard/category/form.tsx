import { Category, CategoryFormData } from '@/app/types/category';
import { Button, Col, Input, Row, Select, Typography } from 'antd';
import { useFormik } from 'formik';
import { InfoCircleOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { isRequired } from '@/app/utils/convertions';

const { Text } = Typography

interface FormCreateProps {
    onSubmit: any
    isLoading: boolean
    formData?: Category
}

const schemaCreate = Yup.object().shape({
    categories: Yup.array().of(Yup.string().min(1, 'Category field is empty'))
});

const schemaEdit = Yup.object().shape({
    name: Yup.string().required(isRequired('Name'))
});

export default function FormCategory({ onSubmit, isLoading, formData }: FormCreateProps) {
    const formik = useFormik({
        initialValues: {
            categories: [],
            name: formData ? formData.name : ''
        },
        validationSchema: formData ? schemaEdit : schemaCreate,
        onSubmit: (values: CategoryFormData) => {
            onSubmit(values)
        },
    });

    function handleSetValues(values: string[]) {
        formik.setFieldValue('categories', values.map((item) => item))
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[10, 10]}>
                <Col span={24}>
                    {formData ? (
                        <>
                            <Input
                                style={{ width: 350 }}
                                value={formik.values.name}
                                onChange={(e) => formik.setFieldValue('name', e.target.value)}
                                name='description'
                                placeholder='Type a description'
                                status={formik.errors.name && 'error'}
                            />
                            {formik.errors.name && formik.touched.name ? (
                                <Typography style={{ color: 'red' }}>{formik.errors.name}</Typography>
                            ) : null}
                        </>
                    ) : (
                        <>
                            <Select
                                value={formik.values.categories}
                                onChange={handleSetValues}
                                placeholder='Type a category'
                                status={formik.errors.categories && 'error'}
                                mode='tags'
                                style={{ width: 450 }}
                                allowClear
                                notFoundContent={
                                    <div style={{ padding: 5 }}>
                                        <p>Nothing to select</p>
                                    </div>
                                }
                            />
                            {formik.errors.categories && formik.touched.categories ? (
                                <Typography style={{ color: 'red' }}>{formik.errors.categories}</Typography>
                            ) : null}
                        </>
                    )}
                </Col>

                {!formData && (
                    <Col>
                        <InfoCircleOutlined />
                        <Text> Press enter to add new categories</Text>
                    </Col>
                )}

                <Col span={24}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        {formData ? 'Save' : 'Create'}
                    </Button>
                </Col>
            </Row>
        </form>
    )
}