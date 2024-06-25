import { View, Text } from "react-native";
import React from "react";
import Club from "./Club";
import CodeBrackets from "../../assets/images/codebracket.png";

const ClubSection = ({ category, clubs }) => {
  return (
    <View className="mb-3">
      <Text className="text-lg font-semibold mb-3">{category}</Text>

      <View className="flex-row flex-wrap">

      {clubs.map((club, index) => (
          <Club key={index} id={club.id} img={CodeBrackets} name={club.name} />
        ))}
        
      </View>
    </View>
  );
};

export default ClubSection;
