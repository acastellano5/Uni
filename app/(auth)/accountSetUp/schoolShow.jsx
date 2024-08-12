import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
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
  });
  const [role, setRole] = useState("");

  
  // displays different fields depending on what role the user selects when trying to join an organization
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
            />
            <CustomButton
              title="Verify"
              containerStyles="bg-primary py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={() => router.push({
                pathname: './verifyEmail',
                params: {role: "school member"}
              })}
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
            />
            <CustomButton
              title="Verify"
              containerStyles="bg-primary py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={() => router.push('./verifyEmail')}
            />
          </>
        );

      case "Guest":
        return (
          <CustomButton
            title="Join"
            containerStyles="bg-primary py-2"
            textStyles="text-white text-base"
          />
        );

      case "Alumni":

        return (
          <>
            <SingleSelect title="Class" placeholder="Select class" data={classData} containerStyles="mb-2"selectedValue={form.class} // Add this line
            onItemSelect={(item) => {
              setForm({
                ...form,
                class: item,
              });
            }}/>
            <SingleSelect title="College" placeholder="Select college" data={collegesData} containerStyles="mb-2"selectedValue={form.college} // Add this line
            onItemSelect={(item) => {
              setForm({
                ...form,
                college: item,
              });
            }}/>
            <SingleSelect title="State" placeholder="Select State" data={statesData} containerStyles="mb-2"selectedValue={form.state} // Add this line
            onItemSelect={(item) => {
              setForm({
                ...form,
                state: item,
              });
            }}/>
            <SingleSelect title="Field of employment" placeholder="Select field of employment" data={jobFieldsData}selectedValue={form.fieldOfEmployment} // Add this line
            onItemSelect={(item) => {
              
              setForm({
                ...form,
                fieldOfEmployment: item,
              });
            }}/>
            <CustomButton
              title="Join"
              containerStyles="bg-primary py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={() => {sendAlumniRequest(null,{class: form.class.label, classValue: form.class.label, state: form.state.label, stateValue: form.state.value, employment: form.fieldOfEmployment.label, employmentValue: form.fieldOfEmployment.value,college: form.college.label, collegeValue: form.college.value},20030049).then(router.push("./processReq"))}}
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
        <Text className="text-primary text-4xl font-bold">Uni</Text>
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
