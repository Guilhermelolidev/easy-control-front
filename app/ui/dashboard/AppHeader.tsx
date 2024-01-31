import { BellFilled, MailOutlined } from '@ant-design/icons';
import { Badge, Image, Space } from 'antd';

function AppHeader() {
    return (
        <div className="AppHeader">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Image
                    width={40}
                    src="https://images.emojiterra.com/google/android-12l/512px/1f4b2.png"
                ></Image>
                <h2 style={{ color: 'white' }}>Easy Control</h2>
            </div>
            <Space>
                <Badge>
                    <MailOutlined style={{ fontSize: 24, color: 'white' }} />
                </Badge>
                <Badge>
                    <BellFilled style={{ fontSize: 24 }} />
                </Badge>
            </Space>
        </div>
    );
}
export default AppHeader;
