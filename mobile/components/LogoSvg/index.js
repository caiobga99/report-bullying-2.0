import * as React from "react";
import Svg, { Path, Text, Circle } from "react-native-svg";
const SvgLogo = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
    <Path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
  </Svg>
);
export default SvgLogo;
