import api from './instance';

export async function fetchBank() {
    try {
        const results = await api.get(`/bank`);
        return results.data;
    } catch (error) {
        console.log(error);
    }
}
