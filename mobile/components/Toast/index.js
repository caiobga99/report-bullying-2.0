import { ToastAndroid } from "react-native";

const showToast = (props) => {
  ToastAndroid.show(props, ToastAndroid.SHORT);
};

export default showToast;
