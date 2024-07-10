import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import TabButton from "../../../components/TabButton";
import Filter from "../../../components/social/Filter";
import ProfileCard from "../../../components/social/ProfileCard";
import { getUsers, filterUserByRole } from "../../../lib/useFirebase";
import { useGlobalContext } from "../../../context/globalProvider";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const { orgId } = useGlobalContext();

  const [activeTab, setActiveTab] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [orgUsers, setOrgUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch filtered users when tab switches
  useEffect(() => {
    const fetchFilteredUsers = async () => {
      setIsLoading(true);
      const users = await filterUserByRole(orgId, activeTab);
      setOrgUsers(users);
      setIsFilterApplied(true);
      setSearchValue(""); // Clear the search bar when a filter is applied
      setIsLoading(false);
    };

    if (activeTab) {
      fetchFilteredUsers();
    }
  }, [activeTab, orgId]);

  // Fetch initial set of users
  useEffect(() => {
    const fetchInitialUsers = async () => {
      setIsLoading(true);
      const users = await getUsers(orgId);
      setOrgUsers(users);
      setIsFilterApplied(false);
      setIsLoading(false);
    };

    fetchInitialUsers();
  }, [orgId]);

  const onSubmitSearch = async () => {
    setActiveTab("");
    setIsLoading(true);
    const users = await getUsers(orgId, searchValue);
    setIsSearchResult(true);
    setOrgUsers(users);
    setIsFilterApplied(false);
    setIsLoading(false);
  };

  const handleClearSearch = async () => {
    setSearchValue("");
    setIsSearchResult(false);
    setActiveTab("");
    setIsLoading(true);
    const users = await getUsers(orgId);
    setOrgUsers(users);
    setIsLoading(false);
  };

  const handleClearFilter = async () => {
    setActiveTab("");
    setIsFilterApplied(false);
    setIsLoading(true);
    const users = await getUsers(orgId);
    setOrgUsers(users);
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="h-full bg-secondary">
      {/* Header */}
      <Header />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search bar */}
          <SearchBar
            placeholder="Search people"
            filterOnPress={() => setIsFilterVisible(true)}
            isFilterDisabled={!activeTab}
            textValue={searchValue}
            onClearSearch={handleClearSearch}
            handleChangeText={(e) => setSearchValue(e)}
            handleSubmitEditing={onSubmitSearch}
          />

          <View className="w-10/12 mx-auto flex-row justify-center items-center mt-5">
            {/* Search categories */}
            <TabButton
              name="Student"
              activeTab={activeTab}
              containerStyles="p-2 rounded-lg border border-primary"
              onHandleSearchType={() => setActiveTab("Student")}
              activeBackground="#22c55e"
              background="#FFF"
              activeText="#FFF"
              text="#22c55e"
            />
            <TabButton
              name="Alumni"
              activeTab={activeTab}
              containerStyles="p-2 rounded-lg border border-primary ml-2"
              onHandleSearchType={() => setActiveTab("Alumni")}
              activeBackground="#22c55e"
              background="#FFF"
              activeText="#FFF"
              text="#22c55e"
            />
            <TabButton
              name="Faculty/Staff"
              activeTab={activeTab}
              containerStyles="p-2 rounded-lg border border-primary ml-2"
              onHandleSearchType={() => setActiveTab("Faculty/Staff")}
              activeBackground="#22c55e"
              background="#FFF"
              activeText="#FFF"
              text="#22c55e"
            />
            <TabButton
              name="Parent"
              activeTab={activeTab}
              containerStyles="p-2 rounded-lg border border-primary ml-2"
              onHandleSearchType={() => setActiveTab("Parent")}
              activeBackground="#22c55e"
              background="#FFF"
              activeText="#FFF"
              text="#22c55e"
            />
          </View>

          <Filter
            visible={isFilterVisible}
            onRequestClose={() => setIsFilterVisible(false)}
            animationType="slide"
            presentationStyle="formSheet"
            category={activeTab}
          />

          {(isSearchResult || isFilterApplied) && (
            <View className="w-11/12 mx-auto mt-3">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (isSearchResult) {
                    handleClearSearch();
                    handleClearFilter()
                  } else if (isFilterApplied) {
                    handleClearFilter();
                    handleClearSearch()
                  }
                }}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}

          <View
            className={`${!isSearchResult && !isFilterApplied ? "mt-5" : "mt-3"} w-11/12 mx-auto flex-row flex-wrap mb-20`}
          >
            {isLoading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#22c55e" />
              </View>
            ) : (
              orgUsers.map((user, index) => <ProfileCard key={index} user={user} />)
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200, // You can adjust this height as needed
    width: "100%",
  },
});
