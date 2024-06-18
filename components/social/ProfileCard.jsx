import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { router } from "expo-router";

const ProfileCard = () => {
  return (
    <View className="w-1/3 p-1">
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/profile/profileShow')}>
        <View className="bg-white p-1 pb-2 rounded-lg">
          <Image
            source={ProfilePic}
            className="w-full h-[10vh] object-cover rounded-lg mb-3"
          />
          <Text className="text-center">John Doe</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
