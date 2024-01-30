import useAccountWallet from '@/app/hooks/useAccountWallet';
import useCategory from '@/app/hooks/useCategory';
import { AccountWallet } from '@/app/types/accountWallet';
import { Category } from '@/app/types/category';
import { TransactionsFormData } from '@/app/types/transactions';
import MoneyInput from '@/app/ui/components/inputs/MoneyInput';

import { Col, Image, Input, Row, Select, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { schema } from './schemas';
import ButtonStyled from '@/app/ui/components/buttons/ButtonStyled';

const { Text } = Typography

interface FormCreateProps {
    onSubmit: any
    formData?: TransactionsFormData
    isLoading: boolean
}

export default function FormTransaction({ onSubmit, formData }: FormCreateProps) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { queryResult: { data: categories, isLoading: isLoadingCategories } } = useCategory({
        queryResultEnabled: true
    })

    const { queryResult: { data: accountWallets, isLoading: isLoadingAccountwallets } } = useAccountWallet({
        queryResultEnabled: true
    })

    const type = params.get('type')

    const formik = useFormik({
        initialValues: {
            description: formData ? formData.description : '',
            value: formData ? formData.value : '',
            type: type === 'revenue' ? 'REVENUE' : 'EXPENSE',
            categoryId: formData ? formData.categoryId : null,
            accountWalletId: formData ? formData.accountWalletId : null
        },
        validationSchema: schema,
        onSubmit: async (values: TransactionsFormData, { resetForm }) => {
            await onSubmit(values)
            resetForm()
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[10, 15]}>
                <Col xs={24}>
                    <MoneyInput
                        placeholder='Type a value'
                        value={formik.values.value}
                        onValueChange={(value: any) => {
                            formik.setFieldValue('value', value.floatValue)
                        }}
                        status={formik.errors.value && formik.touched.value ? 'error' : undefined}
                    />
                    {formik.errors.value && formik.touched.value ? (
                        <Typography style={{ color: 'red' }}>{formik.errors.value}</Typography>
                    ) : null}
                </Col>

                <Col xs={24}>
                    <Select
                        style={{ width: 350 }}
                        value={formik.values.type}
                        onChange={(value: string) => {
                            formik.setFieldValue('type', value)
                        }}
                        disabled={!formData}
                        options={[
                            { label: 'Revenue', value: 'REVENUE' },
                            { label: 'Expense', value: 'EXPENSE' }
                        ]}
                        status={formik.errors.type && 'error'}
                    />
                </Col>

                <Col xs={24}>
                    <Input
                        style={{ width: 350 }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name='description'
                        placeholder='Type a description'
                        status={formik.errors.description && formik.touched.description ? 'error' : undefined}
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
                        status={formik.errors.categoryId && formik.touched.categoryId ? 'error' : undefined}
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
                    <Select
                        loading={isLoadingAccountwallets}
                        style={{ width: 350 }}
                        value={formik.values.accountWalletId}
                        onChange={(obj: { value: number; label: string }) => {
                            formik.setFieldValue('accountWalletId', obj)
                        }}
                        placeholder="Select an account or wallet"
                        options={accountWallets && accountWallets.map((item: AccountWallet) => ({
                            value: item.id,
                            label: item.account_name,
                            imageUrl: item.imageUrl
                        }))}
                        optionRender={(option: any) => {
                            return (
                                <Space size="small" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image src={option.data.imageUrl} alt="" width={20} height={20} style={{ borderRadius: '50%' }} />
                                    <Text>{option.label}</Text>
                                </Space>
                            )
                        }}
                        status={formik.errors.accountWalletId && formik.touched.accountWalletId ? 'error' : undefined}
                        notFoundContent={
                            <div style={{ padding: 5 }}>
                                <p>No account or wallet</p>
                            </div>
                        }
                    />
                    {formik.errors.accountWalletId && formik.touched.accountWalletId ? (
                        <Typography style={{ color: 'red' }}>{formik.errors.accountWalletId}</Typography>
                    ) : null}
                </Col>

                <Col xs={24}>
                    <ButtonStyled
                        isDanger={type === 'expense'}
                        color={'green'}
                        text={formData ? 'Save' : 'Create'}
                    />
                </Col>
            </Row>
        </form >
    )
}