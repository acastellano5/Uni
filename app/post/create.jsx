import React, { useState, useEffect } from "react";
import { Text, View, Alert, Switch, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import {
  createUserPost,
  createGroupPost,
  uploadToFirebase,
  getUserRole,
  getCompanyByOwner,
  createCompanyPost,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import SingleSelect from "../../components/dropdown/SingleSelect";

const CreatePost = () => {
  // Global context and route parameters
  const { orgId, user } = useGlobalContext();
  const { authorType, groupId } = useLocalSearchParams();

  // Component state
  const [userRole, setUserRole] = useState(""); // Role of the current user
  const [form, setForm] = useState({ text: "", image: "", isOrgCert: null });
  const [companies, setCompanies] = useState([]); // Companies owned by the user
  const [selectedComp, setSelectedComp] = useState(""); // Selected company for post
  const [isOrgPost, setIsOrgPost] = useState(false); // Toggle for org posts
  const [isCompanyPost, setIsCompanyPost] = useState(false); // Toggle for company posts

  // Update `isOrgCert` in the form when the org toggle changes
  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, isOrgCert: isOrgPost }));
  }, [isOrgPost]);

  // Fetch user role and companies owned by the user
  useEffect(() => {
    const fetchData = async () => {
      const role = await getUserRole(orgId);
      const comps = await getCompanyByOwner(user.uid, orgId);
      const companyOptions = comps.map((comp) => ({
        label: comp.companyName,
        value: comp.companyID,
      }));
      setUserRole(role);
      setCompanies(companyOptions);
    };
    fetchData();
  }, [orgId]);

  useEffect(() => {
    console.log("author type: " + authorType);
  }, [authorType]);

  // Reset company selection when the company post toggle is turned off
  useEffect(() => {
    if (!isCompanyPost) {
      setSelectedComp("");
      setForm((prevForm) => ({
        ...prevForm,
        companyName: null,
        companyId: null,
      }));
    }
  }, [isCompanyPost]);

  // Handle post creation
  const handleCreatePost = async () => {
    // Validate text content
    if (form.text.trim() === "") {
      Alert.alert("Validation Error", "You must provide text for the post.");
      return;
    }

    // Validate company selection for company posts
    if (isCompanyPost && (!form.companyName || !form.companyId)) {
      Alert.alert(
        "Validation Error",
        "You must select a company to create a company post."
      );
      return;
    }

    try {
      const imageUrl = form.image ? await uploadToFirebase(form.image) : "";

      if (isCompanyPost) {
        await createCompanyPost(form.companyId, imageUrl, form.text, orgId);
      } else if (authorType === "group") {
        await createGroupPost(groupId, imageUrl, form.text, orgId);
      } else if (authorType === "user") {
        await createUserPost(imageUrl, form.text, orgId);
      }

      router.push("/home");
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the post.");
    }
  };

  // Main render
  return (
    <SafeAreaView className="h-full bg-secondary">
      {/* Header */}
      <BackHeader containerStyles="w-11/12 mx-auto" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-10/12 mx-auto top-[50]">
            <Text className="text-3xl text-center font-semibold">Create Post</Text>

            {/* Text Input */}
            <FormField
              title="Text"
              value={form.text}
              handleChangeText={(text) => setForm({ ...form, text })}
              otherStyles="mb-5"
              placeholder="Type here..."
              labelStyles="text-base"
              isEditable={true}
            />

            {/* Image Upload */}
            <ImageUpload title="Image" form={form} setForm={setForm} />

            {/* Org Post Toggle (Admins Only) */}
            {userRole === "Admin" && (
              <View className="flex-row justify-between mb-5">
                <Text className="text-base">Make an org post</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#063970" }}
                  thumbColor={isOrgPost ? "#FFF" : "#f4f3f4"}
                  onValueChange={() => {
                    setIsOrgPost((prev) => !prev);
                    if (!isOrgPost) {
                      setIsCompanyPost(false);
                    }
                  }}
                  value={isOrgPost}
                />
              </View>
            )}

            {/* Company Post Toggle */}
            {companies.length > 0 && (
              <View className="flex-row justify-between mb-5">
                <Text className="text-base">Make a company post</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#063970" }}
                  thumbColor={isCompanyPost ? "#FFF" : "#f4f3f4"}
                  onValueChange={() => {
                    setIsCompanyPost((prev) => !prev);
                    if (!isCompanyPost) {
                      setIsOrgPost(false);
                    }
                  }}
                  value={isCompanyPost}
                />
              </View>
            )}

            {/* Company Selector */}
            {isCompanyPost && (
              <SingleSelect
                title="Company"
                placeholder="Select Company"
                data={companies}
                selectedValue={selectedComp}
                onItemSelect={(item) => {
                  setSelectedComp(item);
                  setForm({
                    ...form,
                    companyName: item.label,
                    companyId: item.value,
                  });
                }}
                containerStyles="mb-3"
              />
            )}

            {/* Submit Button */}
            <CustomButton
              title="Create"
              containerStyles="bg-primary py-3"
              textStyles="text-white text-base font-semibold"
              handlePress={handleCreatePost}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;
