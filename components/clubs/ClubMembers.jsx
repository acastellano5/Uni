import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Member from "./Member";
import ProfilePic from "../../assets/images/profilepic.jpeg";

const ClubMembers = () => {
  return (
    <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
      <View className="flex-row flex-wrap">
        <Member role="Member" name="Nathan Reid" profileImg={ProfilePic} />

        <Member role="Member" name="Nathan Reid" profileImg={ProfilePic} />

        <Member role="Member" name="Nathan Reid" profileImg={ProfilePic} />

        <Member role="Member" name="Nathan Reid" profileImg={ProfilePic} />
      </View>
    </View>
  );
};

export default ClubMembers;

const styles = StyleSheet.create({});
