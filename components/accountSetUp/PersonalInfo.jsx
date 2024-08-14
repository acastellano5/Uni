import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "../FormField";
import SingleSelect from "../dropdown/SingleSelect";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import { setAccountName } from "../../lib/firebase";

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary", value: "Non-binary" },
  { label: "Prefer not to say", value: "Prefer not to say" },
  { label: "Other", value: "Other" },
];

const PersonalInfo = ({ handleNextPress }) => {
  const [form, setForm] = useState({
    first: "",
    last: "",
    gender: "",
  });

  const handleNext = () => {
    if (!form.first || !form.last || !form.gender) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    setAccountName(form.first, form.last, form.gender)
      .then(handleNextPress)
      .catch((error) => {
        console.error("Error setting account name:", error);
        Alert.alert("Error", "Failed to save your information. Please try again.");
      });
  };

  return (
    <>
      {/* Page title */}
      <Text className="text-4xl font-semibold text-center mb-5">Personal Info</Text>

      {/* Form Inputs */}
      <FormField
        title="First Name"
        placeholder="John"
        isEditable={true}
        value={form.first}
        handleChangeText={(e) => setForm({ ...form, first: e })}
      />
      <FormField
        title="Last Name"
        placeholder="Smith"
        otherStyles="my-3"
        isEditable={true}
        value={form.last}
        handleChangeText={(e) => setForm({ ...form, last: e })}
      />
      <SingleSelect
        data={genderOptions}
        title="Gender"
        placeholder="Select Gender"
        isSearchable={false}
        selectedValue={form.gender}
        onItemSelect={(item) => {
          setForm({
            ...form,
            gender: item.value,
          });
        }}
      />

      {/* Next Button */}
      <CustomButton
        title="Next"
        containerStyles="bg-greenTheme py-3 mt-10"
        textStyles="text-base"
        handlePress={handleNext}
      />
    </>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({});
