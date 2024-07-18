import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/globalProvider";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { AntDesign } from "@expo/vector-icons";

const ManageMemberCard = ({ person }) => {

    const { user } = useGlobalContext()
    const currentUserId = user.uid
  return (
    <View className="flex-row justify-between items-center w-full">
      <View className="flex-row items-center">
        <TouchableOpacity>
          <Image source={ProfilePic} style={styles.profilePic} />
        </TouchableOpacity>

        <TouchableOpacity className="ml-2">
          <Text className="text-sm text-darkGray">Moderator</Text>
          <Text>{person.fullName}</Text>
        </TouchableOpacity>
      </View>

      {currentUserId !== person.id ? (
        <TouchableOpacity activeOpacity={0.8}>
          <AntDesign name="closecircleo" size={24} color="red" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ManageMemberCard;

const styles = StyleSheet.create({
    profilePic: {
        height: 50,
        width: 50,
        borderRadius: 25,
      },
});
