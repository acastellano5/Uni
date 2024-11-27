import { StyleSheet, Text, View, Alert, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {
  createUserPost,
  createGroupPost,
  uploadToFirebase,
  addJobDetails,
  getAllGroups,
  getAllJobs,
  getUserRole,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router, useLocalSearchParams } from "expo-router";
import ImageUpload from "../../components/imageUpload/ImageUpload";

const CreatePost = () => {
  const { orgId } = useGlobalContext();
  const { authorType, groupId } = useLocalSearchParams();
  const [userRole, setUserRole] = useState("");
  const [form, setForm] = useState({
    text: "",
    image: "",
    isOrgCert: null,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setForm({
      ...form,
      isOrgCert: isEnabled,
    });
  }, [isEnabled]);

  const fetchUserRole = async () => {
    const role = await getUserRole(orgId);
    setUserRole(role);
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  const onCreatePress = async () => {
    if (form.text.trim() === "") {
      Alert.alert("Validation Error", "You must provide text for the post.");
      return;
    }
    if (authorType === "group") {
      const tasko = await uploadToFirebase(form.image);

      createGroupPost(groupId, tasko, form.text, orgId);
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
  getAllJobs(2020102);

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <View className="w-10/12 mx-auto top-[50]">
          <Text className="text-3xl text-center font-semibold">
            Create Post
          </Text>

          <FormField
            title="Text"
            value={form.text}
            handleChangeText={(e) => setForm({ ...form, text: e })}
            otherStyles="mb-5"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />
          <ImageUpload title="Image" form={form} setForm={setForm} />

          {userRole === "Admin" ? (
            <View className="flex-row justify-between mb-5">
              <Text className="text-base">Make an org post</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#063970" }}
                thumbColor={isEnabled ? "#FFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          ) : null}

          <CustomButton
            title="Create"
            containerStyles="bg-primary py-3"
            textStyles="text-white text-base font-semibold"
            handlePress={onCreatePress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
