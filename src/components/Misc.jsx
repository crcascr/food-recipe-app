import { View, Text } from "react-native";

function Misc({ info, complement, hp }) {
  return (
    <View className="flex items-center py-2 space-y-1">
      <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
        {info}
      </Text>

      <Text
        style={{ fontSize: hp(1.3) }}
        className="font-bold text-neutral-700"
      >
        {complement}
      </Text>
    </View>
  );
}

export default Misc;
