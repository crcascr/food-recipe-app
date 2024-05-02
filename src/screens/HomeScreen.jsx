import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";

function HomeScreen() {
  const date = new Date();
  const hours = date.getHours();
  let greetings = "";
  if (hours >= 5 && hours < 12) {
    greetings = "¡Hola Pandi, buenos días!";
  } else if (hours >= 12 && hours < 18) {
    greetings = "¡Hola Pandi, buenas tardes!";
  } else {
    greetings = "¡Hola Pandi, buenas noches!";
  }

  const [activeCategory,setActiveCategory]=useState(null)

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* User avatar */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/avatar.png")}
            style={{ width: hp(5.5), height: hp(5.5) }}
          />
          <BellIcon color="gray" size={hp(4)} />
        </View>
        {/* Greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2) }} className="text-neutral-600">
            {greetings}
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Tus recetas favoritas,
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            tu cocina <Text className="text-amber-400">personal.</Text>
          </Text>
        </View>
        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Busca una receta..."
            placeholderTextColor="gray"
            style={{ fontSize: hp(2) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wide"
          />
          <View className="bg-white p-3 rounded-full">
            <MagnifyingGlassIcon color="gray" size={hp(2.5)} strokeWidth={3} />
          </View>
        </View>
        {/* Categories */}
        <View>
          <Categories hP={hp} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
