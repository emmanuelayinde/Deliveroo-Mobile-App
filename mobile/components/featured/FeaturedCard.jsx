import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { MapPinIcon, StarIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const FeaturedCard = ({ url, name, address, rating, restaurantData }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mr-2 rounded bg-white shadow"
      onPress={() => navigation.navigate("Restaurant", { ...restaurantData })}
    >
      <Image source={{ uri: url }} className="h-40 w-60 rounded-t" />
      <View className="gap-2 p-2">
        <Text className="text-lg font-semibold">{name}</Text>
        <View className="flex-row items-center space-x-1 ">
          <Text className="font-medium text-gray-400">
            <StarIcon color={"gray"} size={20} />
          </Text>
          <Text className="font-medium text-gray-400">{rating}</Text>
          <Text className="h-[4px] w-[4px] rounded-full bg-gray-400"></Text>
          <Text className="font-medium text-gray-400"> Japanese</Text>
        </View>
        <View className="flex-row items-center space-x-1 ">
          <MapPinIcon color={"#757575"} size={20} />
          <Text className="font-medium text-gray-400">Nearby</Text>
          <Text className="h-[4px] w-[4px] rounded-full bg-gray-400"></Text>
          <Text className="font-medium text-gray-400">{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
