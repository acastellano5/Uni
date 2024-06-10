import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const clubHome = () => {
  const params = useLocalSearchParams();
  const { name } = params;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default clubHome;
