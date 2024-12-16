

export interface ButtonProps {
    value: string;
    onClick: (value: string) => void;
    className?: string;
}

export interface ScreenProps {
    input: string;
    history: string[];
    onHistoryClick: (operation: string) => void;
}