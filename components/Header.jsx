import { View, Text, Image } from "react-native";
import React from "react";
import logo from "../assets/images/logo.png";
import { FontAwesome } from '@expo/vector-icons';

const Header = ({title, textStyles}) => {
  return (
    <View className="flex-row justify-between w-11/12 mx-auto items-center">
      <Image 
      source={logo} 
      className="h-[30] w-[30]"
      />
      <Text className={`mx-auto text-3xl font-semibold text-white ${textStyles}`}>{title}</Text>

      <FontAwesome name="user-circle" size={24} color="white" />
    </View>
  );
};

export default Header;
