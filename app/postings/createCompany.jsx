import {
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { jobFieldsData } from "../../assets/data";
import SingleSelect from "../../components/dropdown/SingleSelect";
import LogoUpload from "../../components/imageUpload/LogoUpload";
import { addCompany } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";

const CreateCompany = () => {
  const { orgId } = useGlobalContext()
  const [form, setForm] = useState({
    companyLogo:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    location: "",
    companyName: "",
    industry: "",
    description: "",
    isAlumniOwned: true,
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  const onCreatePress = async () => {
    // Validate form fields
    const { companyLogo, location, companyName, industry, description } = form;
  
    if (companyLogo === "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" || !companyLogo.trim()) {
      Alert.alert("Validation Error", "Company Logo is required.");
      return;
    }
    if (!companyName.trim()) {
      Alert.alert("Validation Error", "Company Name is required.");
      return;
    }
    if (!industry.trim()) {
      Alert.alert("Validation Error", "Industry is required.");
      return;
    }
    if (!location.trim()) {
      Alert.alert("Validation Error", "Company Location is required.");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Validation Error", "Description is required.");
      return;
    }
  
    try {
      const newCompanyId = await addCompany(form, orgId);
      router.replace({
        pathname: "/postings/companyInfo",
        params: { companyId: newCompanyId },
      });
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the company.");
      console.error(error);
    }
  };
  
  

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView
          className="w-10/12 mx-auto top-[50]"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl text-center font-semibold mb-3">
            Create Company
          </Text>

          {/* company logo */}
          <View className="items-center">
            <Image
              source={{ uri: form.companyLogo }}
              style={styles.profilePic}
              className="mb-3"
            />
            <LogoUpload
              form={form}
              setForm={setForm}
              containerStyles="w-10/12 mx-auto"
            />
          </View>

          <FormField
            title="Company Name"
            value={form.companyName}
            handleChangeText={(e) => setForm({ ...form, companyName: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <SingleSelect
            title="Industry"
            placeholder="Select industry"
            data={jobFieldsData}
            selectedValue={form.industry}
            onItemSelect={(item) => {
              setForm({ ...form, industry: item.label });
            }}
            containerStyles="mb-3"
          />

          <FormField
            title="Company Location"
            value={form.location}
            handleChangeText={(e) => setForm({ ...form, location: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <FormField
            title="Description"
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            placeholder="Type here..."
            isEditable={true}
            isMultiLine={true}
            maxLength={300}
            otherStyles="mb-3 max-h-40"
          />

          <CustomButton
            title="Create"
            containerStyles="bg-primary py-3 mb-24"
            textStyles="text-white text-base font-semibold"
            handlePress={onCreatePress}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateCompany;

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
    objectFit: "cover",
  },
});
