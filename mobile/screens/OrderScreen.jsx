import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { getRestaurantInfo } from "../redux/slices/restuarantSlice";
import { Image } from "react-native";
import * as Progress from "react-native-progress";
import { generateImgUrl } from "../sanity";
import { PhoneIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const restaurantInfo = useSelector(getRestaurantInfo);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#00ccbb]">
      <SafeAreaView
        style={{
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
        }}
        className="space-y-4 px-6 py-1 z-50"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color={"#fff"} size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-lg font-semibold text-white">Need help?</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between space-x-2 rounded-md bg-white p-4 shadow z-50">
          <View className="flex-1 space-y-2 ">
            <Text className="text-lg font-medium text-gray-400">
              Estimated arrival
            </Text>
            <Text className="text-4xl font-extrabold">40-55 mins</Text>
            <Progress.Bar color="#00ccbb" indeterminate={true} />
            <Text className="text-md font-medium text-gray-400">
              Your order at {restaurantInfo?.name} is being prepared
            </Text>
          </View>
          <Image
            source={require("../assets/delivery.jpg")}
            className="h-12 w-12 rounded-full"
          />
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurantInfo?.latititude,
          longitude: restaurantInfo?.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        mapType="mutedStandard"
        className="w-full flex-1 z-0 -mt-4"
      >
        <Marker
          identifier="origin"
          title={restaurantInfo?.name}
          description={restaurantInfo?.short_description}
          pinColor="#00ccbb"
          coordinate={{
            latitude: restaurantInfo?.latititude,
            longitude: restaurantInfo?.longitude,
          }}
        />
      </MapView>

      <SafeAreaView>
        <View className="flex-row items-center bg-white p-6">
          <View className="flex-1 flex-row items-center space-x-2">
            <Image
              className="h-11 w-11 rounded-full"
              resizeMode="cover"
              source={{ uri: generateImgUrl(restaurantInfo?.image).url() }}
            />
            <View className="">
              <Text className="text-lg font-semibold  text-gray-700">
                Dispatched rider from {restaurantInfo?.name}
              </Text>
              <Text className="text-md text-gray-400 ">Your rider</Text>
            </View>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-1">
            <PhoneIcon color={"#00ccbb"} size={20} />
            <Text className="text-lg font-semibold text-[#00ccbb]">Call </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OrderScreen;
