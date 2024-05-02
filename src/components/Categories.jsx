import { ScrollView, View } from "react-native";
import { categoryData } from "../constants";
import CategoryElement from "./CategoryElement";
import Animated, { FadeInDown } from "react-native-reanimated";

function Categories({ hP, activeCategory, setActiveCategory }) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoryData.map((category, index) => {
          return (
            <CategoryElement
              key={index}
              name={category.name}
              image={category.image}
              hP={hP}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

export default Categories;
