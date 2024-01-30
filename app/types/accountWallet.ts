export interface AccountWallet {
    id?: number
    account_name: string
    initial_balance: string
    type: string
    account_number?: string
    agency?: string
    isFirst: boolean
    imageUrl: string
    bankId: number
}

export interface AccountWalletFormData {
    account_name: string
    initial_balance: string
    type: string
    account_number?: string
    agency?: string
    bankId?: SelectInput | null;
}

type SelectInput = {
    label: string;
    value: number;
}