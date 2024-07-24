import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {
  createUserPost,
  createGroupPost,
  uploadToFirebase,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router, useLocalSearchParams } from "expo-router";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import SingleSelect from "../../components/dropdown/SingleSelect";

const CreateGroup = () => {
  const { orgId } = useGlobalContext();
  const { authorType, groupId } = useLocalSearchParams();
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
  });

  const onCreatePress = async () => {
    if (form.text.trim() === "") {
      Alert.alert("Validation Error", "You must provide text for the post.");
      return;
    }
    if (authorType === "group") {
      createGroupPost(groupId, form.image, form.text, orgId);
    } else if (authorType === "user") {
      if (form.image) {
        const task = await uploadToFirebase(form.image);
        createUserPost(task, form.text, orgId);
      } else {
        createUserPost(form.image, form.text, orgId);
      }
    }
    router.push("/home");
  };

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pb-10">
        <ScrollView className="w-10/12 mx-auto top-[30]" showsVerticalScrollIndicator={false}>
          <Text className="text-3xl mb-3 text-center font-semibold">
            Create Group
          </Text>

          <FormField
            title="Enter Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <SingleSelect
            title="Category"
            placeholder="Select Category"
            containerStyles="mb-3"
            data={[
              { value: "Athletic", label: "Athletic" },
              { value: "Academic", label: "Academic" },
              { value: "Art", label: "Art" },
            ]}
            selectedValue={form.category} // Add this line
            onItemSelect={(item) => {
              setForm({
                ...form,
                category: item.value,
              });
            }}
          />

          <FormField
            title="Description"
            placeholder="Max 300 characters"
            isEditable={true}
            isMultiLine={true}
            value={form.description}
            maxLength={300}
            otherStyles="mb-3"
            handleChangeText={(e) => {
              setForm({
                ...form,
                description: e,
              });
            }}
          />

          <ImageUpload title="Image Banner" form={form} setForm={setForm} />

          <CustomButton
            title="Create"
            containerStyles="bg-primary py-3 mb-20"
            textStyles="text-white text-base font-semibold"
            handlePress={onCreatePress}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({});
