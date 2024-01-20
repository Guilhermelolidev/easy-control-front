interface TitlePageProps {
    title: string
}

export function TitlePage({ title }: TitlePageProps) {
    return (
        <h1 style={{ color: '#1f2d42' }}>{title}</h1>
    )
}

export function TitleFilters({ title }: TitlePageProps) {
    return (
        <h3 style={{ color: 'gray' }}>{title}</h3>
    )
}