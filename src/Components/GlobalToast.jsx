import { toast } from "react-toastify";
let toastId = null;
function GlobalToast({ message, messageTimer, messageType }) {
  if (!toast.isActive(toastId)) {
    toastId = toast(`${message}`, {
      closeOnClick: false,
      toastId: "mw_toast",
      autoClose: messageTimer,
      closeButton: true,
      type: `${messageType}`,
      position: "top-center",
    });
  }
}

export default GlobalToast;
