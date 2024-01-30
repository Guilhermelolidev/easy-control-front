import api from "./instance"

export async function fetchBank() {
    const results = await api.get(`/bank`)
    return results.data
}