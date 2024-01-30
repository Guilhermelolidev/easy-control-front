import { AccountWallet } from "@/app/types/accountWallet"
import { formatMoney } from "@/app/utils/convertions"
import styled from "styled-components"

interface CardAccountInfoProps {
    accountWallet: AccountWallet
}

const Container = styled.div`
    background-color: white;
    padding: 20px 25px;
    border-radius: 10px;
    width: 350px;

    p {
        font-size: 20px;
    }

    strong {
        font-size: 20px;
    }

`

const Align = styled.div<{ isPositive?: boolean }>`
    display: flex;
    justify-content: space-between;

    & + & {
        margin-top: 10px;
    }

    .balance {
        color: ${props => props.isPositive ? '#52c41a' : '#cd5c5c'}
    }

    .title {
        color: rgba(76, 78, 100, 0.87)
    }
`

export default function CardAccountInfo({ accountWallet }: CardAccountInfoProps) {
    const { initial_balance, type } = accountWallet
    return (
        <Container>
            <Align isPositive={Number(initial_balance) > 0}>
                <p>Balance: </p>
                <strong className="balance">{formatMoney(Number(accountWallet.initial_balance))}</strong>
            </Align>

            <Align>
                <p>Account name: </p>
                <strong className="title">{accountWallet.account_name}</strong>
            </Align>

            <Align>
                <p>Type: </p>
                <strong className="title">{accountWallet.type}</strong>
            </Align>

            {type === 'ACCOUNT' && (
                <>
                    <Align>
                        <p>Account number: </p>
                        <strong className="title">{accountWallet.account_number}</strong>
                    </Align>

                    <Align>
                        <p>Agency: </p>
                        <strong className="title">{accountWallet.agency}</strong>
                    </Align>
                </>
            )}
        </Container>
    )
}