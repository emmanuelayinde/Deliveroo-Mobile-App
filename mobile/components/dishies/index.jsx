import { View } from "react-native";
import React from "react";
import DishCard from "./DishCard";

const Dishes = ({ dishes }) => {
  return (
    <View className="bg-white px-4 pt-2 pb-20">
      {dishes?.map((dish) => (
        <DishCard
          key={dish?._id}
          id={dish?._id}
          description={dish?.description}
          name={dish?.name}
          image={dish?.image}
          price={dish?.price}
        />
      ))}
    </View>
  );
};

export default Dishes;
