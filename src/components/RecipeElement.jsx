import { Image, Text, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

function RecipeElement({ name, image, hP, index }) {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(500)
        .springify()
        .damping(12)}
    >
      <Pressable
        className="flex justify-center mb-4 space-y-1 w-full"
        style={{ paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
      >
        <Image
          source={{ uri: image }}
          style={{ height: index % 3 == 0 ? hP(25) : hP(30) }}
          className="rounded-3xl bg-black/5 w-full"
        />
        <Text
          className="font-semibold ml-2 text-neutral-600 text-justify"
          style={{ fontSize: hP(1.5) }}
        >
          {name.length > 20 ? name.slice(0, 20) + "..." : name}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export default RecipeElement;
