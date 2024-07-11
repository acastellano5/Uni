import { View, Text } from "react-native";
import React from "react";
import Group from "./Group";
import CodeBrackets from "../../assets/images/codebracket.png";

const GroupSection = ({ category, groups }) => {
  return (
    <View className="mb-3">
      <Text className="text-lg font-semibold mb-3">{category}</Text>

      <View className="flex-row flex-wrap">
        {groups.map((group, index) => (
          <Group
            key={index}
            id={group.id}
            img={CodeBrackets}
            name={group.name}
          />
        ))}
      </View>
    </View>
  );
};

export default GroupSection;
