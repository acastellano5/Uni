import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";

const ProfileCard = () => {
  return (
    <View className="w-1/3 p-1">
      <View className="bg-white p-1 pb-2 rounded-lg">
        <Image source={ProfilePic} className="w-full h-[10vh] object-cover rounded-lg mb-3"/>
        <Text className="text-center">Micheal Scott</Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
