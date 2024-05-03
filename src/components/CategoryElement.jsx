import { Image, Text, TouchableOpacity, View } from "react-native";

function CategoryElement({
  name,
  image,
  hP,
  activeCategory,
  setActiveCategory,
  handleCategoryChange,
}) {
  return (
    <TouchableOpacity
      className="flex items-center space-y-1 mr-2"
      onPress={() => {
        setActiveCategory(name);
        handleCategoryChange(name);
      }}
    >
      <View
        className={`rounded-full p-[6px] ${
          activeCategory === name ? "bg-amber-400" : "bg-black/10"
        }`}
      >
        <Image
          source={{ uri: image }}
          className="rounded-full"
          style={{ width: hP(6), height: hP(6) }}
        />
      </View>
      <Text
        className={` ${
          activeCategory === name
            ? "font-bold text-neutral-600"
            : "text-neutral-400"
        }`}
        style={{ fontSize: hP(1.6) }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

export default CategoryElement;
