import { View, Text } from "react-native";
import React from "react";
import Club from "./Club";
import CodeBrackets from "../assets/images/codebracket.png";

const ClubSection = ({ category }) => {
  return (
    <View className="mb-3">
      <Text className="text-lg font-semibold mb-3">{category}</Text>

      <View className="flex-row flex-wrap justify-between">
        <Club img={CodeBrackets} name="Programming Club" />

        <Club img={CodeBrackets} name="Programming Club" />

        <Club img={CodeBrackets} name="Programming Club" />
      </View>
    </View>
  );
};

export default ClubSection;
