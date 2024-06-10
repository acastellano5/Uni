import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View className="w-10/12 mx-auto flex-row justify-between items-center">
      <View className="flex-row justify-between px-4 py-3 bg-white rounded-md w-10/12 border border-tertiary shadow">
        <TextInput 
        placeholder="Search clubs and activities" 
        className="mr-3"
        />

        <TouchableOpacity className="absolute right-2 top-2 bg-white">
            <FontAwesome name="search" size={20} color="#CDCDE0" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-white p-3 rounded-md border border-tertiary shadow">
      <FontAwesome name="filter" size={20} color="#CDCDE0" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
