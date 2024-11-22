import { createContext, useContext } from "react";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const toastAPI = useToast();

  return (
    <ToastContext.Provider value={toastAPI}>
      {children}
      {toastAPI.toast.visible && (
        <Toast visible={toastAPI.toast.visible} color={toastAPI.toast.color} text={toastAPI.toast.text} />
      )}
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  const data = useContext(ToastContext);
  if (!data) {
    throw new Error("useToastContext should only be used within ToastProvider.");
  }
  return data;
};

export { ToastProvider, useToastContext };
