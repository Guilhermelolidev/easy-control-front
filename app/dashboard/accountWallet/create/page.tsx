'use client';
import { Breadcrumb, Col, Row } from 'antd';
import FormAccountWallet from '../form';
import Link from 'next/link';
import { AccountWalletFormData } from '@/app/types/accountWallet';
import useAccountWallet from '@/app/hooks/useAccountWallet';

export default function Page() {
    const {
        createMutation: { isLoading, mutate },
    } = useAccountWallet({});

    function onSubmit(values: AccountWalletFormData) {
        mutate(values);
    }

    return (
        <>
            <Row gutter={[10, 15]}>
                <Col span={24}>
                    <h1>Account and wallet</h1>
                </Col>

                <Col span={24}>
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <Link href={'/dashboard'}>Dashboard</Link>
                                ),
                            },
                            {
                                title: (
                                    <Link href={'/dashboard/accountWallet'}>
                                        Account and wallet
                                    </Link>
                                ),
                            },
                            {
                                title: 'New',
                            },
                        ]}
                    />
                </Col>

                <Col span={24}>
                    <FormAccountWallet
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    />
                </Col>
            </Row>
        </>
    );
}
