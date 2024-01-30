import { useQuery } from "react-query";
import { fetchBank } from "../api/bank";
import { Bank } from "../types/bank";

interface useBankProps {
    enabledFetchBank: boolean
}

export default function useBank({ enabledFetchBank = false }: useBankProps) {
    const queryResult = useQuery<Bank[]>('banks', fetchBank, {
        enabled: enabledFetchBank
    })

    return {
        queryResult
    }
}