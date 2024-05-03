import { Text, View } from "react-native";
import { mealData } from "../constants";
import MasonryList from "@react-native-seoul/masonry-list";
import RecipeElement from "./RecipeElement";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function Recipes({ categories }) {
  return (
    <View className="mx-4 space-y-3">
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: hp(3) }}
      >
        Recetas
      </Text>
      <View>
        {categories.length === 0 ? null : (
          <MasonryList
            data={mealData}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item, i }) => (
              <RecipeElement
                name={item.strMeal}
                image={item.strMealThumb}
                hP={hp}
                index={i}
              />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

export default Recipes;
