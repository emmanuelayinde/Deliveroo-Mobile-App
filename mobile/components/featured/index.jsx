import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import FeaturedCard from "./FeaturedCard";
import { generateImgUrl } from "../../sanity";

const Featured = ({ id, restaurants, title, description }) => {
  return (
    <View className="pt-4">
      <View className="px-2">
        <View className="flex-row items-center justify-between text-gray-300 ">
          <Text className="text-lg font-semibold">{title}</Text>
          <ArrowRightIcon color={"gray"} size={"20"} />
        </View>
        <View className="flex-row items-center space-x-2 text-gray-300 ">
          <Text className="text-sm font-medium text-gray-400">
            {description}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8, paddingHorizontal: 8 }}
      >
        {restaurants?.map((restaurant) => (
          <FeaturedCard
            key={restaurant?._id}
            address={
              restaurant?.address?.length > 25
                ? `${restaurant?.address?.substring(0, 22)}...`
                : restaurant?.address
            }
            name={restaurant?.name}
            rating={restaurant?.rating}
            url={
             generateImgUrl(restaurant?.image).url()
            }
            restaurantData={restaurant}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Featured;
