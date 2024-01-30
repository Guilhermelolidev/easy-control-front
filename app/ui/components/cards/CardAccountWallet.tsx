import { AccountWallet } from "@/app/types/accountWallet";
import Image from "next/image";
import styled from "styled-components";

interface CardAccountWalletProps {
    item: AccountWallet
    onClick: () => void
    isSelected: boolean
}

const CardStyled = styled.div<{ isSelected: boolean }>`
    display: flex;
    width: 300px;
    padding: 15;
    border-radius: 10px;
    background-color: white;
    border: 2px solid ${props => props.isSelected ? '#142c8e' : 'white'} ;
    padding: 10px;

    & + & {
        margin-top: 20px;
    }

    &:hover {
        cursor: pointer;
        border: ${props => !props.isSelected && '2px solid #DCDCDC'};
    }

    .content {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .firstLine {
            display: flex;
            justify-content: space-between;
            width: 200px;

            .title {
                font-size: large;
                color: ${props => props.isSelected && '#1072eb'};
            }
        }
    }
`

export default function CardAccountWallet({ item, onClick, isSelected }: CardAccountWalletProps) {
    const { account_name, type, imageUrl, account_number } = item

    return (
        <CardStyled onClick={onClick} isSelected={isSelected}>
            <Image src={imageUrl} alt="" width={50} height={50} style={{ borderRadius: '50%' }} />

            <div className="content">
                <div className="firstLine">
                    <strong className="title">
                        {account_name}
                    </strong>

                    <p>
                        {account_number}
                    </p>
                </div>

                <strong>
                    {type}
                </strong>
            </div>
        </CardStyled>
    )
}