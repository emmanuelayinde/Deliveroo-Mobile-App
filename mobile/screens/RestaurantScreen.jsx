import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generateImgUrl } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  QueueListIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import Dishes from "../components/dishies";
import Currency from "react-currency-formatter";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const { params } = useRoute();
  //   console.log({ params });

  return (
    <ScrollView className="relative">
      <View className="relative">
        <Image
          source={{ uri: generateImgUrl(params?.image).url() }}
          className="h-56 w-full bg-gray-300"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-6 top-10 rounded-full bg-gray-100 p-1 "
        >
          <ArrowLeftIcon color={"#00ccbb"} />
        </TouchableOpacity>
      </View>

      <View className="bg-white">
        <View className="p-4">
          <View className="flex-row items-center gap-2">
            <Text className="mr-2 text-2xl font-bold text-gray-700">
              {params?.name}
            </Text>
            <StarIcon color={"#0f0"} size={20} />
            <Text className="font-medium text-[#0f0] ">{params?.rating}</Text>
          </View>
          <View className="mt-1.5 flex-row items-center gap-2">
            <Text className="font-medium text-gray-400">
              <MapPinIcon color={"#000"} size={20} />
            </Text>
            <Text className="text-md whitespace-pre-wrap font-medium">
              {params?.address}
            </Text>
          </View>
          <View className="mt-1.5">
            <Text className="text-md font-medium">
              {params?.short_description}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between px-4 py-4">
          <View className=" flex-row items-center gap-2">
            <QuestionMarkCircleIcon color={"#757575"} size={20} />
            <Text className="text-lg font-semibold"> Have a food allergy?</Text>
          </View>
          <ChevronRightIcon color={"#0f0"} size={20} />
        </View>
      </View>

      {/* DISHES */}
      <View className='h-full'>
        <Text className="px-4 py-2 text-2xl font-semibold"> Menu</Text>
        <Dishes dishes={params?.dishes} />
      </View>

      <View className="fixed bottom-5 w-full px-8 z-50">
        {/* <TouchableOpacity className=""> */}
        <View className="mx-auto w-full flex-row items-center rounded-md bg-[#00ccbb] p-4">
          <View className="rounded bg-gray-400/25 px-3  py-1">
            <Text className="text-2xl font-bold text-white">0</Text>
          </View>
          <Text className="flex-1 text-center text-2xl font-extrabold text-white ">
            View Basket
          </Text>
          <Text className="text-center text-xl font-extrabold text-white">
            <Currency quantity={10} currency="USD" />
          </Text>
        </View>
        {/* </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
