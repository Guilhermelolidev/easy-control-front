'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/transactions');
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 200,
            }}
        >
            <Spin />
        </div>
    );
}
