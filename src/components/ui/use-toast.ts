import { useState, useEffect } from 'react'

export interface Toast {
    id: string
    title?: string
    description?: string
    variant?: 'default' | 'destructive'
}

interface ToastState {
    toasts: Toast[]
}

const toastState: ToastState = {
    toasts: []
}

const listeners: Array<(state: ToastState) => void> = []

let toastCount = 0

function genId() {
    toastCount = (toastCount + 1) % Number.MAX_VALUE
    return toastCount.toString()
}

function addToast(toast: Omit<Toast, 'id'>) {
    const id = genId()
    const newToast: Toast = {
        ...toast,
        id
    }

    toastState.toasts = [newToast, ...toastState.toasts]
    listeners.forEach(listener => {
        listener(toastState)
    })

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeToast(id)
    }, 5000)

    return {
        id,
        dismiss: () => removeToast(id),
        update: (props: Partial<Toast>) => updateToast(id, props)
    }
}

function removeToast(toastId: string) {
    toastState.toasts = toastState.toasts.filter(toast => toast.id !== toastId)
    listeners.forEach(listener => {
        listener(toastState)
    })
}

function updateToast(toastId: string, toast: Partial<Toast>) {
    toastState.toasts = toastState.toasts.map(t =>
        t.id === toastId ? { ...t, ...toast } : t
    )
    listeners.forEach(listener => {
        listener(toastState)
    })
}

function useToast() {
    const [state, setState] = useState<ToastState>(toastState)

    useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [])

    return {
        ...state,
        toast: addToast,
        dismiss: removeToast
    }
}

export { useToast }
export const toast = addToast