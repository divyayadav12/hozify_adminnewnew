import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000); // 4 seconds duration
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  let config = {
    classes: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    icon: <CheckCircle2 size={20} className="text-emerald-600" />
  };

  if (toast.type === 'error') {
    config = {
      classes: 'border-rose-200 bg-rose-50 text-rose-800',
      icon: <XCircle size={20} className="text-rose-600" />
    };
  } else if (toast.type === 'info') {
    config = {
      classes: 'border-blue-200 bg-blue-50 text-blue-800',
      icon: <Info size={20} className="text-blue-600" />
    };
  } else if (toast.type === 'warning') {
    config = {
      classes: 'border-amber-200 bg-amber-50 text-amber-800',
      icon: <AlertTriangle size={20} className="text-amber-600" />
    };
  }

  return (
    <div 
      className={`flex items-center gap-3 rounded-xl border p-4 shadow-lg transition-all duration-300 transform translate-y-0 scale-100 animate-in slide-in-from-right-5 ${config.classes}`}
    >
      {config.icon}
      <p className="text-sm font-semibold">{toast.message}</p>
      <button 
        onClick={() => onClose(toast.id)}
        className="ml-4 rounded-full p-1 opacity-70 hover:bg-black/5 hover:opacity-100 transition cursor-pointer"
        type="button"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9) + '-' + Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm select-none pointer-events-auto">
        {toasts.map((toast) => (
          <ToastItem 
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
