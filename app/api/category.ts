import api from "./instance"

export async function fetchCategories(filter?: string) {
    const categories = await api.get(`/category?name=${filter ?? ''}`)
    return categories.data
}

export async function deleteCategories(ids: number[]) {
    await api.delete(`/category`, {
        data: {
            ids
        }
    })
}

export async function createCategory(categories?: string[]) {
    await api.post(`/category`, {
        categories
    })
}

export async function findCategory(id: number) {
    const category = await api.get(`/category/${id}`)
    return category.data
}

export async function udpateCategory({ id, name }: { id: number, name: string }) {
    await api.put(`/category/${id}`, {
        name
    })
}