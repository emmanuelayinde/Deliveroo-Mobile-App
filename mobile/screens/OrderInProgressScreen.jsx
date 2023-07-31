import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const OrderInProgress = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Order");
    }, 4000);
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
      }}
      className="h-full w-full items-center justify-center bg-[#00ccbb]"
    >
      <Animatable.Image
        animation={"slideInUp"}
        iterationCount={1}
        source={require("../assets/orderinprogress.gif")}
        resizeMode="contain"
        className="h-96 w-96"
      />

      <Animatable.Text animation={"slideInUp"} iterationCount={1}>
        <Text className="mt-4 text-center text-lg font-bold text-white">
          Order in Progress
        </Text>
      </Animatable.Text>
    </SafeAreaView>
  );
};

export default OrderInProgress;
