import { fetchCategories } from '@/app/api/category';
import { Category } from '@/app/types/category';
import { TransactionsFormData } from '@/app/types/transactions';
import MoneyInput from '@/app/ui/components/MoneyInput';
import { isRequired } from '@/app/utils/convertions';
import { Button, Col, Input, Row, Select, Typography } from 'antd';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import * as Yup from "yup";

interface FormCreateProps {
    onSubmit: any
    formData?: TransactionsFormData
    isLoading: boolean
}

const schema = Yup.object().shape({
    description: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required(isRequired('Description')),
    value: Yup.string()
        .required(isRequired('Value')),
    type: Yup.string(),
    categoryId: Yup.number().required(isRequired('Category')),
});

export default function FormTransaction({ onSubmit, formData }: FormCreateProps) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { data: categories, isLoading: isLoadingCategories } = useQuery('categories', () => fetchCategories(''))

    const type = params.get('type')

    const formik = useFormik({
        initialValues: {
            description: formData ? formData.description : '',
            value: formData ? formData.value : '',
            type: type === 'revenue' ? 'REVENUE' : 'EXPENSE',
            categoryId: formData ? formData.categoryId : null
        },
        validationSchema: schema,
        onSubmit: (values: TransactionsFormData) => {
            onSubmit(values)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[10, 15]}>
                <Col xs={24}>
                    <Input
                        disabled
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        name='type'
                        style={{ width: 150, color: type === 'revenue' ? 'green' : 'red' }}
                    />
                </Col>

                <Col xs={24}>
                    <MoneyInput
                        placeholder='Type a value'
                        value={formik.values.value}
                        onValueChange={(value: any) => {
                            formik.setFieldValue('value', value.floatValue)
                        }}
                        status={formik.errors.value ? 'error' : ''}
                    />
                    {formik.errors.value && formik.touched.value ? (
                        <Typography style={{ color: 'red' }}>{formik.errors.value}</Typography>
                    ) : null}
                </Col>

                <Col xs={24}>
                    <Input
                        style={{ width: 350 }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name='description'
                        placeholder='Type a description'
                        status={formik.errors.description && 'error'}
                    />
                    {formik.errors.description && formik.touched.description ? (
                        <Typography style={{ color: 'red' }}>{formik.errors.description}</Typography>
                    ) : null}
                </Col>

                <Col xs={24}>
                    <Select
                        loading={isLoadingCategories}
                        style={{ width: 350 }}
                        value={formik.values.categoryId}
                        onChange={(obj: { value: number; label: string }) => {
                            formik.setFieldValue('categoryId', obj)
                        }}
                        placeholder="Select a category"
                        options={categories && categories.map((item: Category) => ({
                            value: item.id,
                            label: item.name
                        }))}
                        status={formik.errors.categoryId && 'error'}
                        notFoundContent={
                            <div style={{ padding: 5 }}>
                                <p>Sem categorias</p>
                            </div>
                        }
                    />
                    {formik.errors.categoryId && formik.touched.categoryId ? (
                        <Typography style={{ color: 'red' }}>{formik.errors.categoryId}</Typography>
                    ) : null}
                </Col>

                <Col xs={24}>
                    <Button type="primary" htmlType="submit" >
                        {formData ? 'Save' : 'Create'}
                    </Button>
                </Col>
            </Row>
        </form >
    )
}