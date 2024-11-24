import { StyleSheet, Text, View, Alert, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { jobFieldsData } from "../../assets/data";
import SingleSelect from "../../components/dropdown/SingleSelect";
import { createJob } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";

const CreateJob = () => {
  const { orgId } = useGlobalContext();
  const [form, setForm] = useState({
    role: "",
    companyName: "",
    location: "",
    description: "",
    industry: ""
  });

  useEffect(() => {
    console.log(form)
  }, [ form ])

  const [doesOwnComp, setDoesOwnComp] = useState("");

  const onCreatePress = async () => {
    const newJob = await createJob(orgId, form);
    router.replace({ pathname: "/postings/jobInfo", params: { jobId: newJob } });
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

          <SingleSelect
            title="Do you own this company?"
            placeholder="Select an answer"
            data={[
              {
                label: "Yes",
                value: "Yes",
              },
              {
                label: "No",
                value: "No",
              },
            ]}
            selectedValue={doesOwnComp}
            onItemSelect={(item) => {
              setDoesOwnComp(item.value);
            }}
            containerStyles="mb-3"
          />

          {doesOwnComp === "Yes" ? (
            <SingleSelect
              title="Industry"
              placeholder="Select Industry"
              data={jobFieldsData}
              selectedValue={form.industry}
              onItemSelect={(item) => {
                setForm({ ...form, industry: item.label });
              }}
              containerStyles="mb-3"
            />
          ) : doesOwnComp === "No" ? (
            <FormField
              title="Company"
              value={form.companyName}
              handleChangeText={(e) => setForm({ ...form, companyName: e })}
              otherStyles="mb-3"
              placeholder="Type here..."
              labelStyles="text-base"
              isEditable={true}
            />
          ) : null}

          <SingleSelect
            title="Industry"
            placeholder="Select Industry"
            data={jobFieldsData}
            selectedValue={form.industry}
            onItemSelect={(item) => {
              setForm({ ...form, industry: item.label });
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
