import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import TabButton from "./TabButton";

const TabsDisplay = ({ tabs, activeTab, setActiveTab, containerStyles, textStyles, tabBarStyles }) => {
  return (
    <View className={`w-11/12 mx-auto bg-white flex-row rounded-lg py-2 px-3 ${tabBarStyles}`}>
      {tabs.map((item) => (
        <TabButton
          key={item}
          name={item}
          activeTab={activeTab}
          containerStyles={`rounded-lg w-3/6 ${containerStyles}`}
          textStyles={`${textStyles} font-bold text-center`}
          onHandleSearchType={() => setActiveTab(item)}
          activeBackground="#000"
          background="#FFF"
          activeText="#FFF"
          text="#AAA9B8"
        />
      ))}
    </View>
  );
};

export default TabsDisplay;
