import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import SingleSelect from "../../components/dropdown/SingleSelect";

import { jobFieldsData } from "../../assets/data";
import {
  createJob,
  editJob,
  getCompanyByOwner,
  getJobById,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditJob = () => {
  const { orgId, user } = useGlobalContext();
  const { jobId } = useLocalSearchParams();
  const [job, setJob] = useState();

  const [form, setForm] = useState({
    role: "",
    companyName: "",
    location: "",
    description: "",
    industry: "",
    company: "",
    method: "",
    email: "",
    website: "",
    deadline: "",
  });

  const [doesOwnComp, setDoesOwnComp] = useState("Yes");
  const [ownedCompanies, setOwnedCompanies] = useState([]);
  const [tempDate, setTempDate] = useState(new Date());

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    handleFormUpdate("deadline", currentDate);
    setTempDate(currentDate);
  };

  const formatDeadline = (timestamp) => {
    // Convert the seconds to milliseconds for the JavaScript Date object
    const date = new Date(timestamp.seconds * 1000);

    return date
  };

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

    const fetchJob = async () => {
      const fetchedJob = await getJobById(jobId);
      setForm({
        role: fetchedJob.jobRole,
        companyName: fetchedJob.companyName,
        location: fetchedJob.location,
        description: fetchedJob.description,
        industry: fetchedJob.industry,
        company: fetchedJob.companyID,
        method: fetchedJob.method,
        email: fetchedJob.email,
        website: fetchedJob.website,
        deadline: formatDeadline(fetchedJob.deadline),
      });
      setTempDate(formatDeadline(fetchedJob.deadline))
      setJob(fetchedJob);
    };

    fetchJob();
    fetchCompanies();
  }, [user.uid, orgId]);

  useEffect(() => {
    console.log(form)
  }, [form]);

  const handleFormUpdate = (key, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (form.method === "Email") {
      handleFormUpdate("website", "");
    } else if (form.method === "Website") {
      handleFormUpdate("email", "");
    }
  }, [form.method]);

  useEffect(() => {
    if (doesOwnComp === "No") {
      handleFormUpdate("company", null);
    }
  }, [doesOwnComp]);

  const handleEditPress = async () => {
    if (
      !form.role ||
      (!form.companyName && !form.company) ||
      !form.industry ||
      !form.location ||
      !form.description
    ) {
      alert("Please fill out all fields before proceeding.");
      return;
    }

    if (!form.method) {
      alert("Please select a method of application.");
      return;
    }

    if (form.method === "Email" && !form.email) {
      alert("Please provide a valid email address for application.");
      return;
    }
    if (form.method === "Website" && !form.website) {
      alert("Please provide a valid website URL for application.");
      return;
    }

    if (!form.deadline || new Date(form.deadline) < new Date()) {
      alert("Please select a valid application deadline in the future.");
      return;
    }

    try {
      await editJob(
        job.jobID,
        form.role,
        form.location,
        form.description,
        form.method,
        form.email,
        form.website, 
        form.deadline,
        form.company,
        form.companyName
      )
      router.replace({
        pathname: "/postings/jobInfo",
        params: { jobId: job.jobID },
      });
    } catch (error) {
      alert("There was an error updating the job. Please try again.");
      console.error("Error updating job:", error);
    }
  };

  const handleBackPress = async () => {
    router.replace({ pathname: "/postings/jobInfo", params: { jobId } })
  }

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" onBackPress={handleBackPress} />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-10/12 mx-auto top-[50]">
            <Text className="text-3xl text-center font-semibold">Edit Job</Text>

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
                selectedValue={form.company} // Use company ID as the selected value
                onItemSelect={(item) => {
                  handleFormUpdate("company", item.value); // Update company ID
                  handleFormUpdate("companyName", item.label); // Clear companyName
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

            <SingleSelect
              title="How to apply"
              placeholder="Select method"
              data={[
                { label: "Email", value: "Email" },
                { label: "Website", value: "Website" },
              ]}
              selectedValue={form.method}
              onItemSelect={(item) => handleFormUpdate("method", item.label)}
              containerStyles="mb-3"
            />

            {form.method === "Email" ? (
              <FormField
                title="Email address"
                value={form.email}
                handleChangeText={(value) => handleFormUpdate("email", value)}
                placeholder="Type here..."
                isEditable={true}
                otherStyles="mb-3"
              />
            ) : null}

            {form.method === "Website" ? (
              <FormField
                title="Website"
                value={form.website}
                handleChangeText={(value) => handleFormUpdate("website", value)}
                placeholder="Website url"
                isEditable={true}
                otherStyles="mb-3"
              />
            ) : null}

            <View className="mb-3 items-center flex-row right-1">
              <Text className="text-base">Select Application Deadline</Text>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="default"
                accentColor="#063970"
                onChange={onChangeDate}
              />
            </View>

            <FormField
              title="Description"
              value={form.description}
              handleChangeText={(value) =>
                handleFormUpdate("description", value)
              }
              placeholder="Type here..."
              isEditable={true}
              isMultiLine={true}
              maxLength={300}
              otherStyles="mb-3 max-h-40"
            />

            <CustomButton
              title="Update"
              containerStyles="bg-primary py-3 mb-24"
              textStyles="text-white text-base font-semibold"
              handlePress={handleEditPress}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditJob;

const styles = StyleSheet.create({});
