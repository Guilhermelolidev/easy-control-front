
export function formatMoney(value: number) {
    const formattedNumber = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
    return formattedNumber
}

export function isRequired(value: string) {
    return `${value} is required`
}