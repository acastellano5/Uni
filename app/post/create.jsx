import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { sendPost } from "../../lib/firebase";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { seedDatabase } from "../../lib/seed";
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
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    caption: "",
    postUrl: "",
  });
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
              keyboardType="email-address"
              isEditable={true}
            />
            <FormField
              title="Caption"
              value={form.caption}
              handleChangeText={(e) => setForm({ ...form, caption: e })}
              otherStyles=" mb-5"
              placeholder="Caption..."
              labelStyles="text-base font-medium"
              keyboardType="email-address"
              isEditable={true}
            />
            <CustomButton
              title="Create"
              containerStyles="bg-primary py-3"
              textStyles="text-white text-base font-semibold"
              handlePress={() => {
                sendPost(form.caption,form.postUrl)
              }}
            />
          </View>
      </View>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
