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
import { roles } from "../../../assets/data";
import FormField from "../../../components/FormField";
import CustomButton from "../../../components/CustomButton";
import { classData, collegesData, statesData, jobFieldsData } from "../../../assets/data";
import { sendAlumniRequest } from "../../../lib/useFirebase";

const SchoolShow = () => {
  const [form, setForm] = useState({
    class: "",
    college: "",
    state: "",
    fieldOfEmployment: "",
    schoolEmail: "",
    studentEmail: "",
  });
  const [role, setRole] = useState("");

  const validateFields = () => {
    if (role === "Student" || role === "Faculty/Staff") {
      return form.schoolEmail.trim() !== "";
    } else if (role === "Parent") {
      return form.studentEmail.trim() !== "";
    } else if (role === "Alumni") {
      return (
        form.class &&
        form.college &&
        form.state &&
        form.fieldOfEmployment
      );
    }
    return true;
  };

  const handleFormSubmit = () => {
    if (!validateFields()) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    switch (role) {
      case "Student":
      case "Faculty/Staff":
        router.push({
          pathname: './verifyEmail',
          params: { role: "school member" }
        });
        break;
      case "Parent":
        router.push('./verifyEmail');
        break;
      case "Guest":
        // Perform any action needed for Guest
        break;
      case "Alumni":
        sendAlumniRequest(null, {
          class: form.class.label,
          classValue: form.class.label,
          state: form.state.label,
          stateValue: form.state.value,
          employment: form.fieldOfEmployment.label,
          employmentValue: form.fieldOfEmployment.value,
          college: form.college.label,
          collegeValue: form.college.value
        }, 20030049)
          .then(() => router.push("./processReq"));
        break;
      default:
        break;
    }
  };

  const displayFields = () => {
    switch (role) {
      case "Student":
      case "Faculty/Staff":
        return (
          <>
            <FormField
              title="School email address"
              placeholder="name@schoolemail.com"
              isEditable={true}
              value={form.schoolEmail}
              handleChangeText={(e) => setForm({ ...form, schoolEmail: e })}
            />
            <CustomButton
              title="Verify"
              containerStyles="bg-greenTheme py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={handleFormSubmit}
            />
          </>
        );

      case "Parent":
        return (
          <>
            <FormField
              title="Student's email address"
              placeholder="name@schoolemail.com"
              isEditable={true}
              value={form.studentEmail}
              handleChangeText={(e) => setForm({ ...form, studentEmail: e })}
            />
            <CustomButton
              title="Verify"
              containerStyles="bg-greenTheme py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={handleFormSubmit}
            />
          </>
        );

      case "Guest":
        return (
          <CustomButton
            title="Join"
            containerStyles="bg-greenTheme py-2"
            textStyles="text-white text-base"
            handlePress={handleFormSubmit}
          />
        );

      case "Alumni":
        return (
          <>
            <SingleSelect
              title="Class"
              placeholder="Select class"
              data={classData}
              containerStyles="mb-2"
              selectedValue={form.class}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  class: item,
                });
              }}
            />
            <SingleSelect
              title="College"
              placeholder="Select college"
              data={collegesData}
              containerStyles="mb-2"
              selectedValue={form.college}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  college: item,
                });
              }}
            />
            <SingleSelect
              title="State"
              placeholder="Select State"
              data={statesData}
              containerStyles="mb-2"
              selectedValue={form.state}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  state: item,
                });
              }}
            />
            <SingleSelect
              title="Field of employment"
              placeholder="Select field of employment"
              data={jobFieldsData}
              selectedValue={form.fieldOfEmployment}
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  fieldOfEmployment: item,
                });
              }}
            />
            <CustomButton
              title="Join"
              containerStyles="bg-greenTheme py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={handleFormSubmit}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-greenTheme text-4xl font-bold">Centro</Text>
      </View>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-10">
        <View className="w-10/12 mx-auto">
          <ScrollView showsVerticalScrollIndicator={false} className="h-full">
            {/* back button */}
            <TouchableOpacity
              className="self-start"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text className="text-2xl font-semibold text-center mb-2">
              Salesianum School
            </Text>

            {/* form fields */}
            <>
              <SingleSelect
                title="Role"
                placeholder="Select role"
                data={roles}
                onItemSelect={(item) => setRole(item.value)}
                containerStyles="mb-2"
              />

              {displayFields()}
            </>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SchoolShow;

const styles = StyleSheet.create({});
