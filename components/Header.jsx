import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import logo from "../assets/images/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';

const Header = ({ textStyles }) => {
  return (
    <View className="flex-row justify-between w-11/12 mx-auto items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/profile/profileShow")}
      >
        <FontAwesome name="user-circle" size={27} color="white" />
      </TouchableOpacity>

        <Text
          className={`text-2xl font-semibold text-center text-white ${textStyles}`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Salesianum
        </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/aiChat")}
      >
        <Entypo name="briefcase" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
