import { Image, Select, Space, Typography } from "antd"
import { InputProps } from 'antd/lib/input';

const { Text } = Typography

interface SelectInputImageProps extends HTMLInputElement {
    loading: boolean
    notFoundMessage: string
}

export default function SelectInputImage({ loading, notFoundMessage, style, ...rest }: SelectInputImageProps) {
    return (
        <Select
            {...rest}
            loading={loading}
            //style={style}
            optionRender={(option: any) => {
                return (
                    <Space size="small" style={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={option.data.imageUrl} alt="" width={20} height={20} style={{ borderRadius: '50%' }} />
                        <Text>{option.label}</Text>
                    </Space>
                )
            }}
            allowClear
            notFoundContent={
                <div style={{ padding: 5 }}>
                    <p>{notFoundMessage}</p>
                </div>
            }
        />
    )
}