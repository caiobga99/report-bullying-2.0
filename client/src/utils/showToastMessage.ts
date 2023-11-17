import { toast } from "react-toastify";
const showToastMessage = (message: string, type: string) => {
  type === "error"
    ? toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    : toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
};

export default showToastMessage;
