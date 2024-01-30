import { AccountWalletFormData } from "../types/accountWallet"
import api from "./instance"

export async function fetchAccountsWallets() {
    const results = await api.get(`/accountWallet`)
    return results.data
}

export async function fetchAccountWalletById(id?: number) {
    const results = await api.get(`/accountWallet/${id}`)
    return results.data
}

export async function deleteAccountWalletById(id?: number) {
    await api.delete(`/accountWallet/${id}`)
}

export async function createAccountWallet(data: AccountWalletFormData) {
    await api.post(`/accountWallet`, data)
}