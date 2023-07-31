import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generateImgUrl } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import Dishes from "../components/dishies";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItems,
  basketItemsTotalAmount,
} from "../redux/slices/basketSlice";
import { addToRestaurantt } from "../redux/slices/restuarantSlice";

const RestaurantScreen = () => {
  const basketItems = useSelector(selectBasketItems);
  const basketItemsTotal = useSelector(basketItemsTotalAmount);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const { params } = useRoute();

  useEffect(() => {
    dispatch(addToRestaurantt({ ...params }));
  }, [params]);

  // const

  return (
    <>
      <View className="absolute bottom-5 z-50 w-full px-4">
        <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
          <View className="mx-auto w-full flex-row items-center rounded-md bg-[#00ccbb] px-4 py-3">
            <View className="rounded bg-gray-400/20 px-3 py-1  backdrop-blur-xl">
              <Text className="text-xl font-semibold text-white">
                {basketItems?.length}
              </Text>
            </View>
            <Text className="flex-1 text-center text-xl font-extrabold text-white ">
              View Basket
            </Text>
            <Text className="text-center text-lg font-semibold text-white">
              <Currency quantity={basketItemsTotal} currency="USD" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>

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
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="mr-2 text-2xl font-bold text-gray-600">
                {params?.name}
              </Text>
              <StarIcon color={"gray"} size={20} />
              <Text className="font-medium  text-gray-500 ">
                {params?.rating}
              </Text>
            </View>
            <View className="mb-3 mt-1.5 flex-row items-center gap-2">
              <Text className="font-medium text-gray-400">
                <MapPinIcon color={"gray"} size={20} />
              </Text>
              <Text className="text-md whitespace-pre-wrap font-medium  text-gray-500">
                {params?.address}
              </Text>
            </View>
            <View className="mt-1.5">
              <Text className="text-md font-medium  text-gray-500">
                {params?.short_description}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between px-4 py-4">
            <View className=" flex-row items-center gap-2">
              <QuestionMarkCircleIcon color={"#757575"} size={20} />
              <Text className="text-lg font-semibold  text-gray-500">
                {" "}
                Have a food allergy?
              </Text>
            </View>
            <ChevronRightIcon color={"#00ccbb"} size={20} />
          </View>
        </View>

        {/* DISHES */}
        <View className="h-full">
          <Text className="px-4 py-2 text-2xl font-semibold  text-gray-500">
            {" "}
            Menu
          </Text>
          <Dishes dishes={params?.dishes} />
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
