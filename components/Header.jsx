import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import logo from "../assets/images/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const Header = ({ textStyles }) => {
  return (
    <View className="flex-row justify-between w-11/12 mx-auto items-center">
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/profile/myProfile')}>
        <FontAwesome name="user-circle" size={27} color="white" />
      </TouchableOpacity>

      <Text className={`text-2xl font-semibold text-white ${textStyles}`}>
        Salesianum
      </Text>

      <Image source={logo} className="h-[30px] w-[30px] ml-3" />
    </View>
  );
};

export default Header;
