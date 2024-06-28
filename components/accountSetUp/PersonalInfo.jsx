import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormField from "../FormField";
import SingleSelect from "../dropdown/SingleSelect";
import CustomButton from "../CustomButton";
import { router } from "expo-router";

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary", value: "Non-binary" },
  { label: "Prefer not to say", value: "Prefer not to say" },
  { label: "Other", value: "Other" },
];

const PersonalInfo = ({ handleNextPress }) => {
  return (
    <>
        {/* Page title */}
        <Text className="text-4xl font-semibold text-center mb-5">
            Personal Info
          </Text>

          {/* Form Inputs */}
          <FormField title="First Name" placeholder="John" isEditable={true} />
          <FormField
            title="Last Name"
            placeholder="Smith"
            otherStyles="my-3"
            isEditable={true}
          />
          <SingleSelect
            data={genderOptions}
            title="Gender"
            placeholder="Select Gender"
          />

          {/* Next Button */}
          <CustomButton title="Next" containerStyles="bg-primary py-3 mt-10" textStyles="text-base" handlePress={handleNextPress}/>
    </>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({});
