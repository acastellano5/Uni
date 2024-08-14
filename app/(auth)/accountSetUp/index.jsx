import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import PersonalInfo from "../../../components/accountSetUp/PersonalInfo";
import ProfilePic from "../../../components/accountSetUp/ProfilePic";
import Interests from "../../../components/accountSetUp/Interests";
import { useRouter } from "expo-router";
import { finishSignUp } from "../../../lib/useFirebase";

const AccountSetUp = () => {
  const [currentPage, setCurrentPage] = useState("Personal Info");
  const router = useRouter();


  const displayContent = () => {
    switch (currentPage) {
      case "Personal Info":
        return (
          <PersonalInfo
            handleNextPress={() => setCurrentPage("Profile Picture")}
          />
        );
      case "Profile Picture":
        return (
          <ProfilePic
            handleNextPress={() => setCurrentPage("Interests")}
            handleSkipPress={() => setCurrentPage("Interests")}
          />
        );
      case "Interests":
        return (
          <Interests
            handleNextPress={() =>
               {
                finishSignUp()
              router.push("/accountSetUp/schoolsIndex")
            }}
            handleSkipPress={() =>
               {
                finishSignUp()
              router.push("/accountSetUp/schoolsIndex")
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-greenTheme text-4xl font-bold">Centro</Text>
      </View>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-10">
        <View className="w-10/12 mx-auto">{displayContent()}</View>
      </View>
    </SafeAreaView>
  );
};

export default AccountSetUp;

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});
