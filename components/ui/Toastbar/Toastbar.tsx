"useClient";

import { useContext } from "react";
import Icon from "@/components/core/Icons/Icon";
import NotificationContext from "@/modules/providers/ToastProvider";

export default function Toastbar() {
  const { notification, handleNotification, isSuccess } =
    useContext(NotificationContext);

  if (!notification) {
    return null;
  }

  return (
    <div
      className={`fixed z-100 p-6 rounded-2xl bottom-10 right-10 ${
        isSuccess ? "bg-success" : "bg-error"
      }`}
    >
      <div className="flex items-center gap-2">
        {isSuccess ? (
          <Icon name="Check" size={28} />
        ) : (
          <Icon name="TriangleAlert" />
        )}
        <p>{notification}</p>
      </div>
      <button
        onClick={() => handleNotification(null, false)}
        className="absolute top-2 right-2 p-1 rounded-full bg-base-100 hover:bg-base-200"
      >
        <Icon name="X" size={10} />
      </button>
    </div>
  );
}
