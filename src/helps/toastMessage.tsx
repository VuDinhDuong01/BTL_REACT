import { toast } from 'react-toastify';

type StatusMessage = 'success' | 'error' | 'warn'

interface ToastMessageProps {
    className?: string
    status: StatusMessage
    message: string
}

export const ToastMessage = ({ className, status, message }: ToastMessageProps) => {
    const optionsStatus = () => {
    return  toast[status](message, {className })
    }
    return (
        <>
            {
                optionsStatus()
            }
        </>
    )

}