import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { router } from "expo-router";
import Filter from "../../components/postings/JobFilter";
import { getAllJobs, deleteJobs, getJobsByIndustry } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
        <Text className="text-base font-semibold">{job.companyName}</Text>
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
  const [activeSearchField, setActiveSearchField] = useState(""); // Tracks which field is active
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null); // For filters
  const [modalVisible, setModalVisible] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = async () => {
    const jobs = await getAllJobs(orgId);
    setJobPostings(jobs);
    setFilteredJobs(jobs); // Initially show all jobs
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

  const clearSearch = () => {
    setJobTitle("");
    setLocation("");
    setSelectedIndustry(null);
    setFilteredJobs(jobPostings); // Reset to show all jobs
  };

  const performSearchAndFilter = () => {
    const filtered = jobPostings.filter((job) => {
      const matchesTitle = jobTitle
        ? job.jobRole.toLowerCase().includes(jobTitle.toLowerCase())
        : true;
      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesIndustry = selectedIndustry
        ? job.industry === selectedIndustry
        : true;
      return matchesTitle && matchesLocation && matchesIndustry;
    });
    setFilteredJobs(filtered);
  };

  const removeJob = (jobId) => {
    setJobPostings((prevJobs) => prevJobs.filter((job) => job.jobID !== jobId));
    setFilteredJobs((prevJobs) =>
      prevJobs.filter((job) => job.jobID !== jobId)
    );
  };

  const handleInputClick = (field) => {
    setActiveSearchField(field);
    setModalVisible(true);
  };

  const renderJobPosting = useMemo(
    () =>
      ({ item }) =>
        <JobPosting job={item} removeJob={removeJob} />,
    []
  );

  const fetchFilteredJobs = async () => {
    const jobs = await getJobsByIndustry(orgId, selectedIndustry)
    setJobPostings(jobs)
  }

  useEffect(() => {
    if (selectedIndustry) {
      setJobTitle("")
      fetchFilteredJobs()
    }
  }, [ selectedIndustry ])

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#063970"]}
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
          <TouchableOpacity
            style={{
              flex: 1,
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
            onPress={() => handleInputClick("jobTitle")}
          >
            <Text style={{ color: jobTitle ? "black" : "#ccc" }}>
              {jobTitle || "Search by job title"}
            </Text>
          </TouchableOpacity>
          {/* Location Input */}
          <TouchableOpacity
            style={{
              flex: 1,
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
              marginHorizontal: 5,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
            onPress={() => handleInputClick("location")}
          >
            <Text style={{ color: location ? "black" : "#ccc" }}>
              {location || "Search by location"}
            </Text>
          </TouchableOpacity>
          {/* Search Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#063970",
              padding: 8,
              borderRadius: 5,
            }}
            activeOpacity={0.8}
            onPress={performSearchAndFilter}
          >
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
          {/* Clear Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#e6e6e6",
              padding: 8,
              borderRadius: 5,
              marginLeft: 5,
            }}
            activeOpacity={0.8}
            onPress={clearSearch}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          {/* Filter Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#e6e6e6",
              padding: 8,
              borderRadius: 5,
              marginLeft: 5,
            }}
            activeOpacity={0.8}
            onPress={() => setIsFilterVisible(true)}
          >
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#063970"
            />
          </TouchableOpacity>
        </View>

        <Filter
          visible={isFilterVisible}
          onRequestClose={() => setIsFilterVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
          setSelectedIndustry={setSelectedIndustry}
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
            No jobs found.
          </Text>
        )}
      </ScrollView>

      {/* Full-Screen Search Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={false} presentationStyle="formSheet">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TextInput
            style={{
              height: 50,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 18,
              width: "100%",
            }}
            placeholder={
              activeSearchField === "jobTitle"
                ? "Enter job title"
                : "Enter location"
            }
            value={
              activeSearchField === "jobTitle" ? jobTitle : location
            }
            onChangeText={(text) => {
              if (activeSearchField === "jobTitle") setJobTitle(text);
              else setLocation(text);
            }}
            autoFocus
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#063970",
                padding: 15,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#e6e6e6",
                padding: 15,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default JobsFeed;
