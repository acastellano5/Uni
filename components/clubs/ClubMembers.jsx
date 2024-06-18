import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";

const ClubMembers = () => {
  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      <View className="flex-row flex-wrap">
        <Member role="Member" name="John Doe" profileImg={ProfilePic} />

        <Member role="Member" name="John Doe" profileImg={ProfilePic} />

        <Member role="Member" name="John Doe" profileImg={ProfilePic} />

        <Member role="Member" name="John Doe" profileImg={ProfilePic} />
      </View>
    </View>
  );
};

export default ClubMembers;

const styles = StyleSheet.create({});
