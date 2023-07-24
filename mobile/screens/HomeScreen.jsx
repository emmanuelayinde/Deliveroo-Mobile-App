import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/categories";
import Featured from "../components/featured";
import { fetctCategories, fetctFeatured } from "../sanity";

const HomeScreen = () => {
  const [featureds, setFeatureds] = useState([]);
  const [cateogories, setCateogories] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    fetctCategories()
      .then((data) => {
        setCateogories(data);
      })
      .catch((err) => setCateogories([]));
    fetctFeatured()
      .then((data) => {
        setFeatureds(data);
      })
      .catch((err) => setFeatureds([]));
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
      }}
      className="bg-white py-1"
    >
      {/* HEADER */}
      <View className="mb-3 flex-row items-center justify-between px-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={require("../assets/burger.jpg")}
            className="h-9 w-9 rounded-full bg-gray-500"
          />
          <View>
            <Text className="text-sm font-medium text-gray-400">
              Welcome back!
            </Text>
            <View className="flex-row items-center space-x-1">
              <Text className="text-lg font-bold text-gray-900">
                Deliver Now
              </Text>
              <ChevronDownIcon
                size={"20"}
                fontWeight={"700"}
                color={"rgb(17 24 39)"}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity className="rounded-md bg-gray-400 p-2">
          {/* <Image
            source={require("../assets/burger.jpg")}
            className="h-9 w-9 rounded-full bg-gray-500"
          /> */}
          <UserIcon color={"#f9f9f9"} />
        </TouchableOpacity>
      </View>
      {/* SEARCH */}
      <View className="px-2">
        <View className="mx-auto flex-row items-center space-x-2 rounded-md bg-gray-300 p-2">
          {/* <View className="flex-row items-center space-x-2"> */}
          <MagnifyingGlassIcon size={"25"} color={"rgb(17 24 39)"} />
          <TextInput
            placeholder="Search nearby restaurant"
            className="flex-1"
          />
          <TouchableOpacity className="rounded bg-gray-400 p-1">
            <AdjustmentsVerticalIcon size={"25"} color={"rgb(17 24 39)"} />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
      {/* CATEGORIES & FEATURED */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        className="mt-4 bg-gray-100"
      >
        <Categories cateogories={cateogories} />

        {featureds?.map((featured) => (
          <Featured
            key={featured?._id}
            id={featured?._id}
            description={featured?.description}
            title={featured?.name}
            restaurants={featured?.restaurants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
