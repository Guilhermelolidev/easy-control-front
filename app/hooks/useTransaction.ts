import { useMutation, useQuery, useQueryClient } from "react-query"
import { createTransaction, deleteTransaction, fetchTransactions, findTransaction, updateTransaction } from "../api/transactions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface useTransactionProps {
    description?: string
    categoryId?: number
    accountWalletId?: number
    queryResultWithFilterEnabled?: boolean
    queryResultWithIdEnabled?: boolean
    id?: string
}

export default function useTransaction({
    accountWalletId,
    id,
    categoryId,
    description,
    queryResultWithFilterEnabled = false,
    queryResultWithIdEnabled = false
}: useTransactionProps) {
    const queryClient = useQueryClient();
    const { push } = useRouter()

    const queryResultWithFilter = useQuery(['transactions', description, categoryId, accountWalletId], () => fetchTransactions({
        description: description ?? '',
        categoryId: categoryId,
        accountWalletId: accountWalletId
    }), { enabled: queryResultWithFilterEnabled })

    const queryResultWithId = useQuery(['transaction', id], () => findTransaction(Number(id)), { enabled: queryResultWithIdEnabled })

    const deleteMutation = useMutation(deleteTransaction, {
        onSuccess: () => {
            toast.success('Transaction deleted successfully', { position: 'top-center' });
            queryClient.invalidateQueries('transactions');
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    const createMutation = useMutation(createTransaction, {
        onSuccess: () => {
            toast.success('Transaction created successfully!', { position: 'top-center' });
            queryClient.invalidateQueries('transactions');
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    const updateMutation = useMutation(updateTransaction, {
        onSuccess: () => {
            toast.success('Transaction updated successfully!', { position: 'top-center' });
            queryClient.invalidateQueries('transactions')
            queryClient.invalidateQueries('transaction')
            push('/dashboard/transactions')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    return {
        queryResultWithFilter,
        deleteMutation,
        createMutation,
        updateMutation,
        queryResultWithId
    }
}