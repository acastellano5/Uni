import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import ProfilePicture from "../../assets/images/profilepic.jpeg";
import { router } from "expo-router";
import ProfileUpload from "../imageUpload/ProfileUpload";

const ProfilePic = ({ handleNextPress, handleSkipPress }) => {
  const [form, setForm] = useState({
    profilePicture: null,
  });

  return (
    <>
      {/* Page title */}
      <Text className="text-4xl font-semibold text-center mb-5">
        Profile Picture
      </Text>

      {/* Form Inputs */}
      {/* <View className="items-center">
        <TouchableOpacity style={styles.profilePic} activeOpacity={0.7}>
          <Image source={ProfilePicture} style={styles.profilePic} />
        </TouchableOpacity>

        <TouchableOpacity className="mt-5" activeOpacity={0.7}>
          <Text className="text-base font-medium">Upload Photo</Text>
        </TouchableOpacity>

        <ProfileUpload/>
      </View> */}

      <View className="items-center">
        <Image
          source={
            form.profilePicture ? { uri: form.profilePicture } : ProfilePicture
          }
          style={styles.profilePic}
          className="mb-3"
        />
        <ProfileUpload
          form={form}
          setForm={setForm}
          containerStyles="w-10/12 mx-auto"
        />
      </View>

      {/* Next and Skip Buttons */}
      <View className="flex-row justify-center mt-10">
        <CustomButton
          title="Skip"
          containerStyles="bg-tertiary py-2 px-8"
          textStyles="text-base"
          handlePress={handleSkipPress}
        />

        <CustomButton
          title="Next"
          containerStyles="bg-primary py-2 px-8 ml-3"
          textStyles="text-base"
          handlePress={handleNextPress}
        />
      </View>
    </>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});
