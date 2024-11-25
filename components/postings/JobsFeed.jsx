import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { router, Link } from "expo-router";
import Filter from "../../components/postings/JobFilter";
import { getAllJobs, deleteJobs } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from '@expo/vector-icons/AntDesign';

const JobPosting = ({ job, removeJob }) => {
  const { user } = useGlobalContext();

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
              removeJob(job.jobID); // Remove from UI
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
    <TouchableOpacity
      className="bg-white rounded-lg p-3 mb-3 w-11/12 mx-auto d-flex flex-row items-start justify-between"
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/postings/jobInfo",
          params: { jobId: job.jobID },
        })
      }
    >
      <View>
        <Text className="text-lg font-bold">{job.jobRole}</Text>
        <Link
          href={`/postings/companyInfo?companyId=${job.companyID}`}
          className="text-base font-semibold"
        >
          {job.companyName}
        </Link>
        <Text className="mb-3">{job.location}</Text>

        <TouchableOpacity
          className="bg-primary py-1 px-3 rounded-lg"
          style={{ alignSelf: "flex-start" }}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/postings/jobInfo",
              params: { jobId: job.jobID },
            })
          }
        >
          <Text className="text-white">See More</Text>
        </TouchableOpacity>
      </View>

      {user.uid === job.postedBy ? (
        <View className="flex-row items-start">
          <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
            <FontAwesome name="trash-o" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const JobsFeed = () => {
  const { orgId } = useGlobalContext();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = async () => {
    const jobs = await getAllJobs(orgId);
    setJobPostings(jobs);
    setJobsLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const removeJob = (jobId) => {
    setJobPostings((prevJobs) => prevJobs.filter((job) => job.jobID !== jobId));
  };

  const clearSearch = () => {
    setJobTitle("");
    setLocation("");
  };

  const performSearch = () => {
    alert(`Searching for:\nJob Title: ${jobTitle}\nLocation: ${location}`);
    // Perform search logic here
  };

  const renderJobPosting = useMemo(
    () =>
      ({ item }) =>
        <JobPosting job={item} removeJob={removeJob} />,
    []
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ff0000", "#00ff00", "#0000ff"]}
          tintColor="#063970"
        />
      }
    >
      <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  }}
  className="w-11/12 mx-auto"
>
  {/* Job Title Input */}
  <TextInput
    style={{
      flex: 1,
      height: 40,
      borderColor: "#ccc",
      fontSize: 12.5,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    }}
    placeholder="Search by job title"
    value={jobTitle}
    onChangeText={setJobTitle}
  />
  {/* Location Input */}
  <TextInput
    style={{
      flex: 1,
      height: 40,
      borderColor: "#ccc",
      fontSize: 12.5,
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 5, // Spacing between last input and search button
      paddingHorizontal: 10,
    }}
    placeholder="Search by location"
    value={location}
    onChangeText={setLocation}
  />
  {/* Search Button */}
  <TouchableOpacity
    style={{
      backgroundColor: "#063970",
      padding: 8,
      borderRadius: 5,
      marginRight: 3, // Spacing between search and clear buttons
    }}
    activeOpacity={0.8}
    onPress={performSearch}
  >
    <AntDesign name="search1" size={24} color="white" />
  </TouchableOpacity>
  {/* Clear Button */}
  <TouchableOpacity
    style={{
      backgroundColor: "#e6e6e6",
      padding: 8,
      borderRadius: 5,
    }}
    activeOpacity={0.8}
    onPress={clearSearch}
  >
    <AntDesign name="close" size={24} color="black" />
  </TouchableOpacity>
</View>


      <Filter
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
        setUsers={() => {
          console.log("yurr");
        }}
      />

      {jobsLoading ? (
        <ActivityIndicator size="large" color="#063970" />
      ) : jobPostings.length > 0 ? (
        <FlatList
          data={jobPostings}
          renderItem={renderJobPosting}
          keyExtractor={(item) => item.id || item.jobID}
        />
      ) : (
        <Text className="text-center text-darkGray text-base mt-10">
          No jobs yet.
        </Text>
      )}
    </ScrollView>
  );
};

export default JobsFeed;
