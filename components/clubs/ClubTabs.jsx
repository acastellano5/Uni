import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
      className="rounded-lg w-3/6 py-3"
    >
      <Text style={styles.btnText(name, activeTab)} className="text-lg font-bold text-center">{name}</Text>
    </TouchableOpacity>
  );
}

const ClubTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View className="w-11/12 mx-auto bg-white flex-row rounded-lg py-2 px-3 mb-6">
        {tabs.map((item) => (
        <TabButton
          key={item}
          name={item}
          activeTab={activeTab}
          onHandleSearchType={() => setActiveTab(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: (name, activeTab) => ({
    backgroundColor: name === activeTab ? "#000" : "#FFF",
  }),
  btnText: (name, activeTab) => ({
    color: name === activeTab ? "#FFF" : "#AAA9B8",
  }),
});

export default ClubTabs;
