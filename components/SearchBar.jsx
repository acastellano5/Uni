import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ placeholder, filterOnPress, isFilterDisabled }) => {
  const isDisabled = isFilterDisabled;
  return (
    <View className="w-10/12 mx-auto flex-row justify-between items-center">
      <View className="flex-row justify-between px-4 py-3 bg-white rounded-md w-10/12 border border-tertiary shadow">
        <TextInput placeholder={placeholder} className="mr-3" />

        <TouchableOpacity className="absolute right-2 top-2 bg-white">
          <FontAwesome name="search" size={20} color="#CDCDE0" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className={`bg-white p-3 rounded-md border border-tertiary shadow ${
          isDisabled ? "opacity-50" : "opacity-100"
        }`}
        onPress={filterOnPress}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <Ionicons name="filter" size={19} color="#CDCDE0" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
