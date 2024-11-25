import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, Link, router } from "expo-router";
import {
  getJobById,
  getUserAttributes,
  deleteJobs,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const jobInfo = () => {
  const { jobId } = useLocalSearchParams();
  const { user } = useGlobalContext();

  const [job, setJob] = useState({});
  const [contact, setContact] = useState({});

  const fetchJob = async () => {
    const fetchedJob = await getJobById(jobId);
    const user = await getUserAttributes(fetchedJob.postedBy);
    setJob(fetchedJob);
    setContact(user);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete this job posting?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteJobs(job.jobID); // Delete from database
              router.dismiss()
            } catch (error) {
              console.error("Error deleting job:", error);
            }
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView className="w-11/12 mx-auto">
          {user.uid === job.postedBy ? (
            <View className="d-flex items-end">
              <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
                <FontAwesome name="trash-o" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ) : null}
          <Text className="text-3xl font-semibold">{job.jobRole}</Text>
          <Link
            href={`/postings/companyInfo?companyId=${job.companyID}`}
            className="text-2xl font-semibold"
          >
            {job.companyName}
          </Link>
          <Text className="text-xl font-semibold">{job.location}</Text>
          <Text className="text-lg font-semibold text-gray-400">
            Posted by {contact.fullName}
          </Text>

          <Text className="text-base font-semibold mt-5 mb-3">Description</Text>
          <Text className="text-base">{job.description}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default jobInfo;
