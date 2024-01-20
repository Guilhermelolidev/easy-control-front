import { Input } from "antd"
import { NumericFormat } from "react-number-format"

interface MoneyInputProps {
    placeholder: string
    value: any
    onValueChange: any
    status?: 'warning' | 'error' | ''
}

export default function MoneyInput({ placeholder, status, ...rest }: MoneyInputProps) {
    return (
        <NumericFormat
            {...rest}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={1}
            prefix="R$ "
            customInput={Input}
            style={{ width: 150 }}
            placeholder={placeholder}
            status={status}
        />
    )
}