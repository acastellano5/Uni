import { StyleSheet, Text, View, Alert, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { jobFieldsData } from "../../assets/data";
import SingleSelect from "../../components/dropdown/SingleSelect"

const CreateJob = () => {
  const [form, setForm] = useState({
    role: "",
    company: "",
    fieldOfEmployment: "",
    location: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  const onCreatePress = () => {
    alert("yayyyyyy");
  };

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <View className="w-10/12 mx-auto top-[50]">
          <Text className="text-3xl text-center font-semibold">Create Job</Text>

          <FormField
            title="Role"
            value={form.role}
            handleChangeText={(e) => setForm({ ...form, role: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <FormField
            title="Company"
            value={form.company}
            handleChangeText={(e) => setForm({ ...form, company: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <SingleSelect
            title="Field of employment"
            placeholder="Select field of employment"
            data={jobFieldsData}
            selectedValue={form.fieldOfEmployment}
            onItemSelect={(item) => {
              setForm({ ...form, fieldOfEmployment: item.label });
            }}
            containerStyles="mb-3"
          />

          <FormField
            title="Location"
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
            containerStyles="bg-primary py-3"
            textStyles="text-white text-base font-semibold"
            handlePress={onCreatePress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateJob;

const styles = StyleSheet.create({});
