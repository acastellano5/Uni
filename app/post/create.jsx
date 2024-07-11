import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { runSeed, seedDatabase, seedGroups } from "../../lib/seed";
import { createComment, createEvent, createPost, createUserPost, deleteComment, filterUserByRole, followUser, getEventById, getGroupByCategory, getGroupById, getUserByGroup, getUsers, isUserInGroup } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";
import { getCurrentUser } from "../../lib/firebase";
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log(result);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

const create = () => {
  //runSeed()
  //createEvent("group", 20030049,"Plants", "Salesianum", '2023-06-10','2023-06-11',["8d9631b8-9a71-492e-a89e-aaa6aa684db5"],"8d9631b8-9a71-492e-a89e-aaa6aa684db5","Planting Trees")
  //getEventById("f0677ddd-050c-4443-90cd-42b7853ed90d",20030049)

  // getting orgId from global context
  const { orgId } = useGlobalContext();
  //createEvent('user', orgId, "Soccer Practice", "Salesianum", '2024-08-11', '2024-08-11', 'lbNMpnLjx9bU1mROL6AjtSQdub73','lbNMpnLjx9bU1mROL6AjtSQdub73',"Go to Soccer Practice")

    useEffect(() => {
    console.log(orgId)
  })
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    caption: "",
    postUrl: "",
  });

  useEffect(() => {
    console.log(form)
  }, [form])
  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
          <View className="w-10/12 mx-auto top-[50]">
            <Text className="text-3xl text-center font-semibold">
              Create Post
            </Text>

            <FormField
              title="Post"
              value={form.postUrl}
              handleChangeText={(e) => setForm({ ...form, postUrl: e })}
              otherStyles="mb-3"
              placeholder="Post url..."
              labelStyles="text-base font-medium"
              isEditable={true}
            />
            <FormField
              title="Caption"
              value={form.caption}
              handleChangeText={(e) => setForm({ ...form, caption: e })}
              otherStyles=" mb-5"
              placeholder="Caption..."
              labelStyles="text-base font-medium"
              isEditable={true}
            />
            <CustomButton
              title="Create"
              containerStyles="bg-primary py-3"
              textStyles="text-white text-base font-semibold"
              handlePress={() => {
                createUserPost(form.postUrl,form.caption, orgId)
                router.push('/home')
              }}
            />
          </View>
      </View>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
