import { ActivityIndicator } from "react-native";

function Loading({ color, size }) {
  return <ActivityIndicator size={size} color={color} />;
}

export default Loading;
