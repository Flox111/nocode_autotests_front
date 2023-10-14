export interface BlockProps {
    title: string;
    children?: React.ReactNode
}

export interface BlockCardProps {
    type: string,
    description: string;
    icon: string;
    color: string
}