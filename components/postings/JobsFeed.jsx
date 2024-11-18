import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/postings/JobFilter"

const JobPosting = () => {
  return (
    <TouchableOpacity
      className="bg-white rounded-lg p-3 mb-3 w-11/12 mx-auto"
      activeOpacity={0.8}
      onPress={() => router.push("/postings/jobInfo")}
    >
      <Text className="text-lg font-bold">Software Engineer</Text>
      <Text className="text-base font-semibold">Microsoft</Text>
      <Text className="mb-3">San Francisco, CA</Text>

      <TouchableOpacity
        className="bg-primary py-1 px-3 rounded-lg"
        style={{ alignSelf: "flex-start" }}
        activeOpacity={0.8}
        onPress={() => router.push("/postings/jobInfo")}
      >
        <Text className="text-white">See More</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const JobsFeed = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Controls filter modal visibility

  const clearSearch = () => {
    setSearchValue("");
  };

  const performSearch = () => {
    alert("search performed");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SearchBar
        placeholder="Search by location"
        filterOnPress={() => setIsFilterVisible(true)}
        textValue={searchValue}
        onClearSearch={clearSearch}
        handleChangeText={setSearchValue}
        handleSubmitEditing={performSearch}
        onValidateSearch={() => setSearchValue("")}
        needFilter={true}
        containerStyles="mb-3"
      />

      <Filter
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
        setUsers={() => {console.log("yurr")}}
      />
      <JobPosting />
      <JobPosting />
      <JobPosting />
    </ScrollView>
  );
};

export default JobsFeed;
