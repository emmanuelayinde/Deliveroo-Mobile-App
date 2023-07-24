import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { generateImgUrl } from "../../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
} from "../../redux/slices/basketSlice";

const DishCard = ({ name, description, image, price, id }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items) {
      const itemsById = items.filter((item) => item.id === id);
      setBasketItems(itemsById);
    }
  }, [items]);

  const addDishToBasket = () => {
    dispatch(addToBasket({ name, description, price, image, id }));
  };

  const removeDishFromBasket = () => {
    if (!basketItems?.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className="w-full flex-row items-start justify-between  overflow-x-hidden  pt-2"
      >
        <View className="mr-6 flex-1 flex-wrap gap-1.5 ">
          <Text className="text-2xl font-medium text-gray-700">{name}</Text>
          <Text className="text-md w-full text-gray-500">{description}</Text>
          <Text className="text-md text-gray-500">
            <Currency quantity={price} currency="USD" />
          </Text>
        </View>
        <View className="">
          <Image
            source={{ uri: generateImgUrl(image).url() }}
            className="h-20 w-20 rounded-md"
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="mt-2">
          <View className="flex-row items-center justify-start space-x-2 pb-2">
            <TouchableOpacity
              disabled={items.length <= 0 ? true : false}
              onPress={() => removeDishFromBasket()}
            >
              <MinusCircleIcon
                size={40}
                color={basketItems.length > 0 ? "#00ccbb" : "grey"}
              />
            </TouchableOpacity>
            <Text>{basketItems?.length}</Text>
            <TouchableOpacity onPress={() => addDishToBasket()}>
              <PlusCircleIcon size={40} color={"#00ccbb"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishCard;
