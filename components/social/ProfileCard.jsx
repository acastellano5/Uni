import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { router } from "expo-router";

const ProfileCard = ({ user }) => {
  
  return (
    <View className="w-1/3 p-1">
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-white p-1 pb-2 rounded-lg flex-1"
        onPress={() =>
          router.push({
            pathname: "/profile/profileShow",
            params: { uid: user.id },
          })
          
        }
      >
        {user.profilePicture ? (
                    <Image
                    source={{uri: user.profilePicture}}
                    className="w-full h-[10vh] object-cover rounded-lg mb-3"
                  />
        ):(          <Image
          source={ProfilePic}
          className="w-full h-[10vh] object-cover rounded-lg mb-3"
        />)}

          <Text className="text-center">{user.fullName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
