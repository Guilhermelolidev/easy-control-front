import { Button, ButtonProps } from 'antd';
import Link from 'next/link';
import { WalletOutlined, BankOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface AddAccountWalletProps {
    text?: string;
    isWallet?: boolean;
    href: string;
}

type CombinedProps = AddAccountWalletProps & ButtonProps;

export default function AddAccountWallet({
    text = 'Add account',
    isWallet,
    href,
    ...rest
}: CombinedProps) {
    return (
        <Link href={href}>
            <Button
                {...rest}
                type="text"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 100,
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                }}
            >
                {isWallet ? (
                    <WalletOutlined
                        style={{ fontSize: '30px', color: '#142c8e' }}
                    />
                ) : (
                    <BankOutlined
                        style={{ fontSize: '30px', color: '#142c8e' }}
                    />
                )}
                <p>{text}</p>
            </Button>
        </Link>
    );
}
