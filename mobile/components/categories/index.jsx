import { ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { generateImgUrl } from "../../sanity";

const Categories = ({ cateogories }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 8 }}
    >
      {cateogories?.map((category) => (
        <CategoryCard
          key={category?._id}
          title={category?.name}
          url={
           generateImgUrl(category?.image).url()
          }
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
