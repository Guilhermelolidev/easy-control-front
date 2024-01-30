import { useMutation, useQuery, useQueryClient } from "react-query"
import { createAccountWallet, deleteAccountWalletById, fetchAccountWalletById, fetchAccountsWallets } from "../api/accountWallet"
import { AccountWallet } from "../types/accountWallet"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface UseAccountWalletProps {
    queryResultEnabled?: boolean
    queryResultWithIdEnabled?: boolean
    id?: number
    setIdSelected?: any
}

export default function useAccountWallet({ setIdSelected, queryResultEnabled = false, queryResultWithIdEnabled = false, id }: UseAccountWalletProps) {
    const queryClient = useQueryClient();
    const { push } = useRouter()

    const queryResult = useQuery('accountWallets', fetchAccountsWallets, {
        enabled: queryResultEnabled
    })

    const queryResultWithId = useQuery<AccountWallet>(['accountWallet', id], () => fetchAccountWalletById(id), {
        enabled: queryResultWithIdEnabled
    })

    const deleteMutation = useMutation(deleteAccountWalletById, {
        onSuccess: () => {
            toast.success('Account/wallet deleted successfully', { position: 'top-center' });
            queryClient.invalidateQueries('accountWallets');
            setIdSelected(null)
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    const createMutation = useMutation(createAccountWallet, {
        onSuccess: () => {
            toast.success('Register created successfully', { position: 'top-center' });
            queryClient.invalidateQueries('accountWallets');
            push('/dashboard/accountWallet')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    return {
        queryResult,
        queryResultWithId,
        deleteMutation,
        createMutation
    }
}