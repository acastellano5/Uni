import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormField from "../FormField";
import SingleSelect from "../dropdown/SingleSelect";
import CustomButton from "../CustomButton";
import { useState } from "react";
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
    first: null,
    last: null,
    gender: null,

  });
  return (
    <>
        {/* Page title */}
        <Text className="text-4xl font-semibold text-center mb-5">
            Personal Info
          </Text>

          {/* Form Inputs */}
          <FormField title="First Name" placeholder="John" isEditable={true} value={form.first} handleChangeText={(e) => setForm({ ...form, first: e })}/>
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
            selectedValue={form.gender} // Add this line
            onItemSelect={(item) => {
              setForm({
                ...form,
                gender: item.value,
              });
            }}
          />

          {/* Next Button */}
          <CustomButton title="Next" containerStyles="bg-primary py-3 mt-10" textStyles="text-base" handlePress={()=>{setAccountName(form.first, form.last, form.gender).then(handleNextPress)}}/>
    </>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({});
