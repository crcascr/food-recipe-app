import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  UsersIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import Misc from "../components/Misc";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

function RecipeDetailScreen(props) {
  let item = props.route.params;
  const image = item.strMealThumb;
  const name = item.strMeal;
  const idRecipe = item.idMeal;

  const [liked, setLiked] = useState(false);

  const navigation = useNavigation();

  const [recipeDetails, setRecipeDetails] = useState([]);

  const [loading, setLoading] = useState(false);

  const getRecipeDetail = async (idRecipe) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`
      );
      if (response && response.data) {
        setRecipeDetails(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error al obtener las recetas:", error);
    }
  };

  useEffect(() => {
    getRecipeDetail(idRecipe);
  }, []);

  const ingredientsIndex = (recipe) => {
    if (!recipe) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regExp = /[?&]v=([^&]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      {/* Recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: image }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
          className="rounded-3xl bg-black/5 w-full"
        />
      </View>
      {/* Back button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-10"
      >
        <TouchableOpacity
          className="p-1 rounded-full ml-3 bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(4.5)} strokeWidth={3} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-1 rounded-full mr-3 bg-white"
          onPress={() => setLiked(!liked)}
        >
          <HeartIcon
            size={hp(4.5)}
            strokeWidth={3}
            color={liked ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>
      {/* Recipe details */}
      {loading ? (
        <Loading color={"#fbbf24"} size={"large"} />
      ) : (
        <View className="px-4 flex justify-between space-y-4">
          {/* Recipe name and area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {name}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipeDetails?.strArea}
            </Text>
          </Animated.View>
          {/* Misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <Misc info="35" complement="Mins" hp={hp} />
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <Misc info="3" complement="Porciones" hp={hp} />
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <Misc info="103" complement="Calorías" hp={hp} />
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <Misc info="" complement="Facil" hp={hp} />
            </View>
          </Animated.View>
          {/* Ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredientes
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndex(recipeDetails).map((index) => (
                <View key={index} className="flex-row space-x-4">
                  <View
                    style={{ width: hp(1.5), height: hp(1.5) }}
                    className="rounded-full bg-amber-300"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-medium text-neutral-600"
                    >
                      {recipeDetails[`strIngredient${index}`]}
                    </Text>
                    <Text style={{ fontSize: hp(1.7) }}>-</Text>
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-extrabold text-neutral-600"
                    >
                      {recipeDetails[`strMeasure${index}`]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
          {/* Instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instrucciones
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {recipeDetails.strInstructions}
            </Text>
          </Animated.View>
          {/* Video */}
          {recipeDetails.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(recipeDetails.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default RecipeDetailScreen;
