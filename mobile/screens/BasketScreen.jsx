import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDish,
  removeDishFromBasket,
  selectBasketItems,
} from "../redux/slices/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { TrashIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { generateImgUrl } from "../sanity";

const BasketScreen = () => {
  const [groupedItems, setGroupedItems] = useState([]);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const deliveryFee = 5.5;

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItems(groupedItems);
  }, [items]);

  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
      }}
      className="h-full w-full"
    >
      {/* HEADING */}
      <View className="flex-row items-center justify-center border-b-[0.5px] border-[#00ccbb] bg-white px-4 py-2 shadow-lg">
        <View className="">
          <Text className="text-center text-xl font-bold">Restaurant</Text>
          <Text className=" text-center text-lg text-gray-400">Restaurant</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute right-5"
        >
          <XCircleIcon color={"#00ccbb"} size={40} />
        </TouchableOpacity>
      </View>
      {/*  */}
      <View className="my-2 flex-row items-center bg-white px-4 py-3">
        <View className="flex-1 flex-row items-center space-x-3">
          <Image
            source={require("../assets/logo.png")}
            className="h-11 w-11 rounded-full"
          />
          <Text className="text-xl font-bold">Delivery in 50 - 55 mins</Text>
        </View>

        <TouchableOpacity>
          <Text className="text-lg font-semibold text-[#00ccbb]">Change</Text>
        </TouchableOpacity>
      </View>

      {/* BASKET ITEMS */}
      <ScrollView className="flex-1 space-y-4 bg-white px-4 py-3">
        {/* ITEMS */}
        {Object.entries(groupedItems).map(([key, item]) => (
          <View key={key} className="flex-row items-center space-x-2 py-2">
            <View className="flex-1 flex-row items-center space-x-2">
              <Text className="text-lg font-semibold text-[#00ccbb]">
                {item.length} x{" "}
              </Text>
              <Image
                source={{ uri: generateImgUrl(item[0].image).url() }}
                resizeMode="cover"
                className="h-12 w-12 rounded-full"
              />
              <Text className="text-lg font-bold">{item[0].name}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Text className="text-lg font-semibold text-gray-600">
                <Currency quantity={item[0].price} currency={"USD"} />
              </Text>
              <TouchableOpacity
                onPress={() =>
                  dispatch(removeDishFromBasket({ id: item[0].id }))
                }
              >
                <TrashIcon color={"#Ff4757"} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* PLACE ORDER */}
      <View className="shadow/ z-50 mt-2 w-full space-y-4 bg-white p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg text-gray-400">Subtotal</Text>
          <Text className="text-lg text-gray-400">
            <Currency quantity={90} currency="USD" />
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg text-gray-400">Delivery fee</Text>
          <Text className="text-lg text-gray-400">
            <Currency quantity={deliveryFee} currency="USD" />
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold">Delivery fee</Text>
          <Text className="text-lg font-bold">
            <Currency quantity={90 + deliveryFee} currency="USD" />
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderInProgress")}
        >
          <View className="mx-auto w-full flex-row items-center rounded-md bg-[#00ccbb] px-4 py-3">
            <Text className="flex-1 text-center text-xl font-extrabold text-white ">
              Place Order
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
