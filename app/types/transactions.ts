export interface Transactions {
    id: number;
    description: string;
    value: string;
    categoryId: number | null;
    category?: string;
    type: string;
}

export interface TransactionsFormData {
    description: string;
    value: string | number;
    categoryId: SelectCategory | null;
    type: string;
    accountWalletId: SelectCategory | null;
}

type SelectCategory = {
    label: string;
    value: number;
};
