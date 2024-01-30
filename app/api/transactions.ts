import { TransactionsFormData } from "../types/transactions";
import api from "./instance";

export async function fetchTransactions({ description, categoryId, accountWalletId }: {
    description: string,
    categoryId?: number,
    accountWalletId?: number
}) {
    const transactions = await api.get(`/transaction?description=${description}&categoryId=${categoryId}&accountWalletId=${accountWalletId}`)
    return transactions.data
}

export async function createTransaction(body: TransactionsFormData) {
    await api.post(`/transaction`, body)
}

export async function deleteTransaction(ids: number[]) {
    await api.delete(`/transaction`, {
        data: {
            ids
        }
    })
}

export async function updateTransaction({ id, data }: { id: number, data: TransactionsFormData }) {
    await api.put(`/transaction/${id}`, data)
}

export async function findTransaction(id: number) {
    const result = await api.get(`/transaction/${id}`)
    return result.data
}

