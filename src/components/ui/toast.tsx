import React from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { Toast, useToast } from './use-toast'

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onClose }) => {
  const getIcon = () => {
    if (toast.variant === 'destructive') {
      return <AlertCircle className="h-5 w-5 text-red-600" />
    }
    return <CheckCircle className="h-5 w-5 text-green-600" />
  }

  const getStyles = () => {
    if (toast.variant === 'destructive') {
      return 'bg-red-50 border-red-200 text-red-900'
    }
    return 'bg-green-50 border-green-200 text-green-900'
  }

  return (
    <div className={`max-w-sm w-full rounded-lg border p-4 shadow-lg ${getStyles()} transition-all duration-300 ease-in-out`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 w-0 flex-1">
          {toast.title && (
            <p className="text-sm font-medium">
              {toast.title}
            </p>
          )}
          {toast.description && (
            <p className="mt-1 text-sm opacity-90">
              {toast.description}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => onClose(toast.id)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const Toaster: React.FC = () => {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          onClose={dismiss}
        />
      ))}
    </div>
  )
}

export default ToastComponent