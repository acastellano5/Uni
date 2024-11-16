import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import SingleSelect from "../../../components/dropdown/SingleSelect";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { classData, collegesData, statesData, jobFieldsData } from "../../../assets/data";
import { sendAlumniRequest } from "../../../lib/useFirebase";

const AlumniForm = () => {
  // State to manage form inputs for alumni-specific fields
  const [form, setForm] = useState({
    class: "", // Alumni graduation class
    college: "", // College attended
    state: "", // State of residence
    fieldOfEmployment: "", // Employment field
  });

  // Function to validate that all required fields are filled
  const validateFields = () => {
    return (
      form.class &&
      form.college &&
      form.state &&
      form.fieldOfEmployment
    );
  };

  // Function to handle form submission
  const handleFormSubmit = () => {
    // Check if all fields are valid
    if (!validateFields()) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    // Submit alumni data and navigate to the next screen
    sendAlumniRequest(null, {
      class: form.class.label, // Alumni class
      classValue: form.class.label, // Alumni class value
      state: form.state.label, // State of residence
      stateValue: form.state.value, // State value
      employment: form.fieldOfEmployment.label, // Employment field
      employmentValue: form.fieldOfEmployment.value, // Employment field value
      college: form.college.label, // College name
      collegeValue: form.college.value, // College value
    }, 20030049)
      .then(() => router.push("./processReq")); // Navigate to request processing page
  };

  return (
    <SafeAreaView className="bg-black h-full">
      {/* App Header */}
      <View className="pl-9">
        <Text className="text-greenTheme text-4xl font-bold">Centro</Text>
      </View>

      {/* Main Container */}
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-10">
        <View className="w-10/12 mx-auto">
          <ScrollView showsVerticalScrollIndicator={false} className="h-full">
            {/* Back Button */}
            <TouchableOpacity
              className="self-start"
              onPress={() => router.back()} // Navigate back to the previous screen
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            {/* Form Title */}
            <Text className="text-2xl font-semibold text-center mb-2">
              Salesianum School
            </Text>

            {/* Alumni Form Fields */}
            <SingleSelect
              title="Class" // Dropdown for selecting class
              placeholder="Select class"
              data={classData}
              containerStyles="mb-2"
              selectedValue={form.class}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  class: item, // Update class field
                });
              }}
            />
            <SingleSelect
              title="College" // Dropdown for selecting college
              placeholder="Select college"
              data={collegesData}
              containerStyles="mb-2"
              selectedValue={form.college}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  college: item, // Update college field
                });
              }}
            />
            <SingleSelect
              title="State" // Dropdown for selecting state
              placeholder="Select State"
              data={statesData}
              containerStyles="mb-2"
              selectedValue={form.state}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  state: item, // Update state field
                });
              }}
            />
            <SingleSelect
              title="Field of employment" // Dropdown for selecting employment field
              placeholder="Select field of employment"
              data={jobFieldsData}
              selectedValue={form.fieldOfEmployment}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  fieldOfEmployment: item, // Update employment field
                });
              }}
            />
            <CustomButton
              title="Join" // Button to submit the form
              containerStyles="bg-greenTheme py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={handleFormSubmit} // Trigger form submission
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AlumniForm;

const styles = StyleSheet.create({});
