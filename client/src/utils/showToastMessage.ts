import { toast } from "react-toastify";
const showToastMessage = (
  message: string,
  type: string,
  promisse?: Promise<void>,
  pendingMessage?: string
) => {
  switch (type) {
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "promise":
      if (promisse !== undefined) {
        toast.promise(
          promisse,
          {
            pending: pendingMessage,
            success: message,
            error: "Promise rejected",
          },
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
      break;
    default:
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
  }
};

export default showToastMessage;
