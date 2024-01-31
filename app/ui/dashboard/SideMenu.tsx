'use client';
import {
    AppstoreOutlined,
    ApartmentOutlined,
    CreditCardOutlined,
    WalletOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { TfiMoney } from 'react-icons/tfi';

function SideMenu() {
    const { push } = useRouter();

    return (
        <div className="SideMenu">
            <Menu
                className="SideMenuVertical"
                mode="vertical"
                onClick={(item) => {
                    push(item.key);
                }}
                style={{ paddingTop: 30, paddingLeft: 10, paddingRight: 10 }}
                items={[
                    {
                        label: 'Dashboard',
                        icon: <AppstoreOutlined />,
                        key: '/dashboard',
                        disabled: true,
                    },
                    {
                        label: 'Transactions',
                        key: '/dashboard/transactions',
                        icon: <TfiMoney />,
                    },
                    {
                        label: 'Category',
                        key: '/dashboard/category',
                        icon: <ApartmentOutlined />,
                    },
                    {
                        label: 'Account and wallet',
                        key: '/dashboard/accountWallet',
                        icon: <WalletOutlined />,
                    },
                    {
                        label: 'Credit cards',
                        key: '/dashboard/creditcards',
                        icon: <CreditCardOutlined />,
                        disabled: true,
                    },
                    {
                        label: 'Clients',
                        key: '/dashboard/clients',
                        icon: <UsergroupAddOutlined />,
                        disabled: true,
                    },
                ]}
            ></Menu>
        </div>
    );
}
export default SideMenu;
