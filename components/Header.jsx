import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import logo from "../assets/images/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const Header = ({ textStyles }) => {
  return (
    <View className="flex-row justify-between w-11/12 mx-auto items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/profile/profileShow")}
      >
        <FontAwesome name="user-circle" size={27} color="white" />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} className="w-3/6" onPress={() => router.push('/org')}>
        <Text
          className={`text-2xl font-semibold text-center text-white ${textStyles}`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Salesianum
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/aiChat")}
      >
        <Image source={logo} className="h-[30px] w-[30px] ml-3" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
