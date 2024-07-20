import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  createUserPost,
  createGroupPost,
  uploadToFirebase
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const create = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();
  const { authorType, groupId } = useLocalSearchParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log(image)
  }, [ image ])
  const [form, setForm] = useState({
    caption: "pool day",
    postUrl:
      "https://leisurepoolsusa.com/wp-content/uploads/2020/06/best-type-of-swimming-pool-for-my-home_2.jpg",
  });

  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request permission to access camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // Launch camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // main ui
  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <View className="w-10/12 mx-auto top-[50]">
          <Text className="text-3xl text-center font-semibold">
            Create Post
          </Text>

          {/* <FormField
            title="Post"
            value={form.postUrl}
            handleChangeText={(e) => setForm({ ...form, postUrl: e })}
            otherStyles="mb-3"
            placeholder="Post url..."
            labelStyles="text-base font-medium"
            isEditable={true}
          /> */}

          <CustomButton title="Pick an image from camera roll" handlePress={pickImage}/>

          <CustomButton title="Take a photo" handlePress={takePhoto}/>

          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
            handlePress={async () => {
              if (authorType === "group") {
                createGroupPost(groupId, form.postUrl, form.caption, orgId);
              } else if (authorType === "user") {
                if (image) {
                  const task = await uploadToFirebase(image,"test")
                  createUserPost(task, form.caption, orgId);


                  

                }
                else {
                createUserPost(form.postUrl, form.caption, orgId);
                }
              }
              router.push("/home");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
