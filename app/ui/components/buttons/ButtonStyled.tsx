import { Button } from "antd";
import { lighten } from "polished";
import styled from "styled-components";

const colors = {
    'green': 'green',
    'primary': '#142c8e'
}

type ColorsKey = keyof typeof colors

const ButtonStyle = styled(Button) <{ color: ColorsKey }>`
    background-color: ${props => props.color && colors[props.color]};

    &:hover {
        background-color: ${props => props.color && colors[props.color]};
    }
`

interface ButtonStyledProps {
    isDanger?: boolean
    color?: ColorsKey
    text: string
}

export default function ButtonStyled({ isDanger, color = 'primary', text }: ButtonStyledProps) {
    return (
        <ButtonStyle type="primary" htmlType="submit" danger={isDanger} color={color}>
            {text}
        </ButtonStyle>
    )
}