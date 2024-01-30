import useBank from '@/app/hooks/useBank';
import { AccountWalletFormData } from '@/app/types/accountWallet';
import { Bank } from '@/app/types/bank';
import ButtonStyled from '@/app/ui/components/buttons/ButtonStyled';
import MoneyInput from '@/app/ui/components/inputs/MoneyInput';
import { Col, Input, Row, Select, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { schemaValidation } from './schemas';
import { useEffect } from 'react';

const { Text } = Typography

interface FormCreateProps {
    onSubmit: any
    isLoading: boolean
}

export default function FormAccountWallet({ onSubmit }: FormCreateProps) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { queryResult: { data: banks, isLoading: loadingBanks } } = useBank({
        enabledFetchBank: true
    })

    const type = params.get('type')

    const formik = useFormik({
        initialValues: {
            initial_balance: '',
            account_name: '',
            type: type === 'account' ? 'ACCOUNT' : 'WALLET',
            account_number: '',
            agency: '',
            bankId: null
        },
        validationSchema: schemaValidation,
        onSubmit: (values: AccountWalletFormData) => {
            onSubmit(values)
        },
    });

    const inputType = formik.values.type

    useEffect(() => {
        formik.setFieldValue('agency', '');
        formik.setFieldValue('initial_balance', '');
        formik.setFieldValue('account_number', '');
        formik.setFieldValue('account_name', '');
        formik.setFieldValue('agency', '');
        formik.setFieldValue('bankId', null);
    }, [inputType])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[10, 15]}>
                <Col xs={24}>
                    <Select
                        style={{ width: 350 }}
                        value={formik.values.type}
                        onChange={(value: string) => {
                            formik.setFieldValue('type', value)
                        }}
                        options={[
                            { label: 'Account', value: 'ACCOUNT' },
                            { label: 'Wallet', value: 'WALLET' }
                        ]}
                        status={formik.errors.type && 'error'}
                    />
                </Col>

                {
                    inputType === 'ACCOUNT' && (
                        <Col xs={24}>
                            <Select
                                loading={loadingBanks}
                                style={{ width: 350 }}
                                value={formik.values.bankId}
                                onChange={(obj: { value: number; label: string }) => {
                                    formik.setFieldValue('bankId', obj)
                                }}
                                placeholder="Select an account or wallet"
                                options={banks && banks.map((item: Bank) => ({
                                    value: item.id,
                                    label: item.bank_name,
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
                                status={formik.errors.bankId && 'error'}
                                notFoundContent={
                                    <div style={{ padding: 5 }}>
                                        <p>No bank registered</p>
                                    </div>
                                }
                            />
                            {formik.errors.bankId && formik.touched.bankId ? (
                                <Typography style={{ color: 'red' }}>{formik.errors.bankId}</Typography>
                            ) : null}
                        </Col>
                    )
                }

                <Col xs={24}>
                    <Input
                        style={{ width: 350 }}
                        value={formik.values.account_name}
                        onChange={formik.handleChange}
                        name='account_name'
                        placeholder='Account name'
                        status={formik.errors.account_name && formik.touched.account_name ? 'error' : undefined}
                    />
                    {formik.errors.account_name && formik.touched.account_name ? (
                        <Typography style={{ color: 'red' }}>{formik.errors.account_name}</Typography>
                    ) : null}
                </Col>

                {
                    inputType === 'ACCOUNT' && (
                        <>
                            <Col xs={24}>
                                <Input
                                    style={{ width: 350 }}
                                    value={formik.values.account_number}
                                    onChange={formik.handleChange}
                                    name='account_number'
                                    placeholder='Account number'
                                    status={formik.errors.account_number && 'error'}
                                />
                                {formik.errors.account_number && formik.touched.account_number ? (
                                    <Typography style={{ color: 'red' }}>{formik.errors.account_number}</Typography>
                                ) : null}
                            </Col>

                            <Col xs={24}>
                                <Input
                                    style={{ width: 200 }}
                                    value={formik.values.agency}
                                    onChange={formik.handleChange}
                                    name='agency'
                                    placeholder='Agency'
                                    status={formik.errors.agency && 'error'}
                                />
                                {formik.errors.agency && formik.touched.agency ? (
                                    <Typography style={{ color: 'red' }}>{formik.errors.agency}</Typography>
                                ) : null}
                            </Col>
                        </>
                    )
                }

                <Col xs={24}>
                    <MoneyInput
                        placeholder='Initial balance'
                        value={formik.values.initial_balance}
                        onValueChange={(value: any) => {
                            formik.setFieldValue('initial_balance', value.floatValue)
                        }}
                        status={formik.errors.initial_balance && formik.touched.initial_balance ? 'error' : undefined}
                    />
                    {formik.errors.initial_balance && formik.touched.initial_balance ? (
                        <Typography style={{ color: 'red' }}>{formik.errors.initial_balance}</Typography>
                    ) : null}
                </Col>

                <Col xs={24}>
                    <ButtonStyled
                        color={'green'}
                        text={'Create'}
                    />
                </Col>
            </Row>
        </form>
    )
}