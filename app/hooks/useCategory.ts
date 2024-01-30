import { useMutation, useQuery, useQueryClient } from "react-query";
import { createCategory, deleteCategories, fetchCategories, findCategory, udpateCategory } from "../api/category";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UseCategoryProps {
    filter?: string
    id?: string
    queryResultEnabled?: boolean
    queryResultWithFilterEnabled?: boolean
}

export default function useCategory({ filter, id, queryResultEnabled = false, queryResultWithFilterEnabled = false }: UseCategoryProps) {
    const queryClient = useQueryClient();
    const { push } = useRouter()

    const queryResult = useQuery('categories', () => fetchCategories(), {
        enabled: queryResultEnabled
    });

    const queryResultWithFilter = useQuery(['categories', filter], () => fetchCategories(filter), {
        refetchOnMount: true,
        enabled: queryResultWithFilterEnabled
    });

    const queryResultWidthId = useQuery(['category', id], () => findCategory(Number(id)), {
        enabled: !!id
    });

    const deleteMutation = useMutation(deleteCategories, {
        onSuccess: () => {
            toast.success('Category deleted successfully', { position: 'top-center' });
            queryClient.invalidateQueries('categories');
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    const createMutation = useMutation(createCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            toast.success('Category created successfully!', { position: 'top-center', id: "1" })
            push('/dashboard/category')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center', id: "1" });
        }
    })

    const updateMutation = useMutation(udpateCategory, {
        onSuccess: () => {
            toast.success('Category updated successfully!', { position: 'top-center' });
            queryClient.invalidateQueries('category')
            push('/dashboard/category')
        },
        onError: ({ response: { data } }: any) => {
            toast.error(data.message, { position: 'top-center' });
        }
    })

    return {
        queryResult,
        queryResultWithFilter,
        deleteMutation,
        createMutation,
        updateMutation,
        queryResultWidthId
    }
}