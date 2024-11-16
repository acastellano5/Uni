import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import Filter from "../../../components/social/Filter";
import ProfileCard from "../../../components/social/ProfileCard";
import { filterUserByRole, getUsers } from "../../../lib/useFirebase";
import { useGlobalContext } from "../../../context/globalProvider";

export default function Home() {
  const { orgId } = useGlobalContext();

  // State variables
  const [orgUsers, setOrgUsers] = useState([]); // List of users to display
  const [searchValue, setSearchValue] = useState(""); // Search input value
  const [isSearchResult, setIsSearchResult] = useState(false); // Tracks if search results are displayed
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Controls filter modal visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Tracks if a filter is applied
  const [refreshing, setRefreshing] = useState(false); // Refresh state

  // Fetch users filtered to "Alumni" by default or with applied filters
  const fetchUsers = async (filters = null) => {
    setIsLoading(true);
    const users = await filterUserByRole(orgId, "Alumni", searchValue, filters);
    setOrgUsers(users);
    setIsSearchResult(false);
    setIsFilterApplied(!!filters);
    setSearchValue(""); // Clear search input after fetching
    setIsLoading(false);
  };

  // Fetch users on component mount or when `orgId` changes
  useEffect(() => {
    fetchUsers();
  }, [orgId]);

  // Handles user search
  const performSearch = async () => {
    setIsLoading(true);
    const users = await getUsers(orgId, searchValue)
    setOrgUsers(users);
    setIsSearchResult(true);
    setIsFilterApplied(false);
    setIsLoading(false);
  };

  // Clears the search input and refreshes user list
  const clearSearch = async () => {
    setSearchValue("");
    setIsSearchResult(false);
    await fetchUsers();
  };

  // Clears the applied filter and refreshes user list
  const clearFilter = async () => {
    setIsFilterApplied(false);
    await fetchUsers();
  };

  // Pull-to-refresh action
  const refreshUsers = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      {/* App Header */}
      <Header />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5">
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshUsers}
              colors={["#063970"]}
              tintColor="#063970"
            />
          }
        >
          {/* Search Bar */}
          <SearchBar
            placeholder="Search people"
            filterOnPress={() => setIsFilterVisible(true)}
            textValue={searchValue}
            onClearSearch={clearSearch}
            handleChangeText={setSearchValue}
            handleSubmitEditing={performSearch}
            onValidateSearch={() => setSearchValue("")}
            needFilter={true}
          />

          {/* Filter Modal */}
          <Filter
            visible={isFilterVisible}
            onRequestClose={() => setIsFilterVisible(false)}
            animationType="slide"
            presentationStyle="formSheet"
            category="Alumni"
            setUsers={(users) => {
              setOrgUsers(users);
              setIsFilterVisible(false);
              setIsFilterApplied(true);
            }}
          />

          {/* Back Button for Search or Filter */}
          {(isSearchResult || isFilterApplied) && (
            <View className="w-11/12 mx-auto mt-3">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  isSearchResult ? clearSearch() : clearFilter();
                }}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}

          {/* User List or Loading State */}
          <View
            className={`${
              !isSearchResult && !isFilterApplied ? "mt-5" : "mt-3"
            } w-11/12 mx-auto flex-row flex-wrap mb-20`}
            style={{ alignItems: "stretch" }}
          >
            {isLoading && !refreshing ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#063970" />
              </View>
            ) : orgUsers.length === 0 ? (
              <View style={styles.noUsersContainer}>
                <Text style={styles.noUsersText}>No users found</Text>
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

// Styles
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: "100%",
  },
  noUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: "100%",
  },
  noUsersText: {
    fontSize: 18,
    color: "#666",
  },
});
