import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import SingleSelect from "../../components/dropdown/SingleSelect";

import { jobFieldsData } from "../../assets/data";
import { createJob, getCompanyByOwner } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const CreateJob = () => {
  const { orgId, user } = useGlobalContext();

  const [form, setForm] = useState({
    role: "",
    companyName: "",
    location: "",
    description: "",
    industry: "",
    company: "",
  });

  const [doesOwnComp, setDoesOwnComp] = useState("");
  const [ownedCompanies, setOwnedCompanies] = useState([]);
  const [alumniCompanyName, setAlumniCompanyName] = useState("");

  // Fetch companies owned by the current user
  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await getCompanyByOwner(user.uid, orgId);
      const mappedCompanies = companies.map((company) => ({
        label: company.companyName,
        value: company.companyID,
      }));
      setOwnedCompanies(mappedCompanies);
    };

    fetchCompanies();
  }, [user.uid, orgId]);

  // Log form changes for debugging
  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleFormUpdate = (key, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const handleCreatePress = async () => {
    const newJobId = await createJob(orgId, form);
    router.replace({
      pathname: "/postings/jobInfo",
      params: { jobId: newJobId },
    });
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
            handleChangeText={(value) => handleFormUpdate("role", value)}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <SingleSelect
            title="Do you own this company?"
            placeholder="Select an answer"
            data={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            selectedValue={doesOwnComp}
            onItemSelect={(item) => setDoesOwnComp(item.value)}
            containerStyles="mb-3"
          />

          {doesOwnComp === "Yes" ? (
            <SingleSelect
              title="Company"
              placeholder="Select Company"
              data={ownedCompanies}
              selectedValue={alumniCompanyName}
              onItemSelect={(item) => {
                setAlumniCompanyName(item.label);
                handleFormUpdate("company", item.value);
                handleFormUpdate("companyName", "");
              }}
              containerStyles="mb-3"
            />
          ) : doesOwnComp === "No" ? (
            <FormField
              title="Company"
              value={form.companyName}
              handleChangeText={(value) =>
                handleFormUpdate("companyName", value)
              }
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
            onItemSelect={(item) => handleFormUpdate("industry", item.label)}
            containerStyles="mb-3"
          />

          <FormField
            title="Location"
            value={form.location}
            handleChangeText={(value) => handleFormUpdate("location", value)}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <FormField
            title="Description"
            value={form.description}
            handleChangeText={(value) => handleFormUpdate("description", value)}
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
            handlePress={handleCreatePress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateJob;

const styles = StyleSheet.create({});
