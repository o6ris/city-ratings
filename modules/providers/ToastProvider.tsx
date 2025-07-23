import { createContext, useState, ReactNode } from "react";

type notifContextType = {
  notification: string | null;
  setNotification: (notification: string | null) => void;
  isSuccess: boolean;
  handleNotification: (notification: string | null, isSuccess: boolean) => void;
};

const NOTIF_TIME = 4000;
const NotificationContext = createContext<notifContextType>({
  notification: null,
  setNotification: () => {},
  isSuccess: false,
  handleNotification: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleNotification = (
    notification: string | null,
    isSuccess: boolean
  ) => {
    setNotification(notification);
    setIsSuccess(isSuccess);
    setTimeout(() => {
      setNotification(null);
    }, NOTIF_TIME);
  };

  return (
    <NotificationContext.Provider
      value={{
        isSuccess,
        notification,
        setNotification,
        handleNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
