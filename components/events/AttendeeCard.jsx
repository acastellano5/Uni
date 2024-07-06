import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import React from "react";
import { router } from "expo-router";

const AttendeeCard = ({ isFirst, attendee }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3"
      style={styles.containerStyle(isFirst)}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/profile/profileShow",
          params: { uid: attendee.id },
        })
      }
    >
      <Image source={ProfilePic} style={styles.profilePic} className="mr-3" />
      <Text className="text-base">{attendee.email}</Text>
    </TouchableOpacity>
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
    borderTopColor: isFirst ? "none" : "#C9C9C9",
  }),
});
