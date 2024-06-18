import { StyleSheet, Text, View, Image } from "react-native";
import ProfilePic from "../../assets/images/profilepic.jpeg"
import React from "react";

const AttendeeCard = ({isFirst}) => {
  return (
    <View className="flex-row items-center py-3" style={styles.containerStyle(isFirst)}>
      <Image source={ProfilePic} style={styles.profilePic} className="mr-3"/>
      <Text className="text-base">Dwight Schrute</Text>
    </View>
  );
};

export default AttendeeCard;

const styles = StyleSheet.create({
    profilePic: {
      height: 45,
      width: 45,
      borderRadius: 22.5,
    },
    containerStyle: (isFirst) => ({
        borderTopWidth: isFirst ? 0 : 0.5,
        borderTopColor: isFirst ? 'none' : '#C9C9C9'
      }),
  });
