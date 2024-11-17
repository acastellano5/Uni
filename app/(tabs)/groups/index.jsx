import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../../components/SearchBar";
import GroupSection from "../../../components/groups/GroupSection";
import {
  getGroupsByCategory,
  getGroupsByName,
  getGroupsByUser,
  getFollowedGroupsByUser,
  getUserRole,
} from "../../../lib/useFirebase";
import { getCurrentUser } from "../../../lib/firebase";
import Group from "../../../components/groups/Group";
import BackButton from "../../../components/BackButton";
import GroupFilter from "../../../components/groups/GroupFilter";
import { useGlobalContext } from "../../../context/globalProvider";
import TabsDisplay from "../../../components/TabsDisplay";
import { router } from "expo-router";

const tabs = ["My Groups", "All"];
const groupTypes = [
  "Academic",
  "Faith, Justice, Wellness",
  "Athletic",
  "General",
  "Alumni",
];

export default function Groups() {
  const { orgId } = useGlobalContext();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentUser, setCurrentUser] = useState("");
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      const roleStatus = await getUserRole(orgId);
      setUserRole(roleStatus);
      setCurrentUser(user.uid);
    };

    fetchCurrentUser();
  }, []);

  const fetchAllGroups = async (isRefreshing) => {
    if (!isRefreshing) {
      setLoading(true);
    }
    const groupData = {};

    for (const type of groupTypes) {
      const groupsByType = await getGroupsByCategory(type, orgId);
      groupData[type] = groupsByType;
    }
    setGroups(groupData);
    setLoading(false);
    setRefreshing(false);
  };

  const fetchMyGroups = async (isRefreshing) => {
    if (!isRefreshing) {
      setLoading(true);
    }
    const groupCategories = ["Joined", "Following"];
    const groupData = {};

    for (const category of groupCategories) {
      if (category === "Joined") {
        const joinedGroups = await getGroupsByUser(currentUser, orgId, true);
        groupData[category] = joinedGroups;
      } else if (category === "Following") {
        const followedGroups = await getFollowedGroupsByUser(
          currentUser,
          orgId,
          true
        );
        groupData[category] = followedGroups;
      }
    }

    setGroups(groupData);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (currentUser) {
      if (activeTab === "All") {
        setSearchValue("");
        setIsSearchResult(false);
        setSearchResults([]);
        setIsFilterApplied(false);
        fetchAllGroups();
      } else if (activeTab === "My Groups") {
        setSearchValue("");
        setIsSearchResult(false);
        setSearchResults([]);
        setIsFilterApplied(false);
        fetchMyGroups();
      }
    }
  }, [activeTab, currentUser]);

  const onSubmitSearch = async () => {
    if (!searchValue.trim()) return;

    const groupsResult = await getGroupsByName(searchValue, orgId);
    setIsSearchResult(true);
    setIsFilterApplied(false);
    setSearchResults(groupsResult || []);
  };

  const handleFilterSelect = async (selectedCategory) => {
    const filteredGroups = await getGroupsByCategory(selectedCategory, orgId);
    setGroups({ [selectedCategory]: filteredGroups });
    setIsSearchResult(false);
    setSearchValue("");
    setSearchResults([]);
    setIsFilterApplied(true);
  };

  const resetFilter = async () => {
    setLoading(true);
    const groupData = {};

    for (const type of groupTypes) {
      const groupsByType = await getGroupsByCategory(type, orgId);
      groupData[type] = groupsByType;
    }

    setGroups(groupData);
    setLoading(false);
    setIsFilterApplied(false);
  };

  const resetGroups = (isRefreshing) => {
    setSearchValue("");
    setIsSearchResult(false);
    setSearchResults([]);
    setIsFilterApplied(false);
    fetchAllGroups(isRefreshing);
  };

  const onValidateSearch = () => {
    setSearchValue("");
    setIsSearchResult(false);
    setSearchResults([]);
    setIsFilterApplied(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (activeTab === "All") {
      resetGroups(true);
    } else if (activeTab === "My Groups") {
      fetchMyGroups(true);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <Header />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-2 w-3/6"
          textStyles="text-base"
          tabBarStyles="w-10/12 mt-3"
        />
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
          {activeTab === "All" && (
            <SearchBar
              placeholder="Search groups"
              containerStyles="mt-5"
              textValue={searchValue}
              handleChangeText={setSearchValue}
              handleSubmitEditing={onSubmitSearch}
              onClearSearch={() => resetGroups()}
              onValidateSearch={onValidateSearch}
              filterOnPress={() => setIsFilterVisible(true)}
              needFilter={true}
            />
          )}

          {loading ? (
            <View className="h-full items-center justify-center mt-10">
              <ActivityIndicator size="large" color="#063970" />
            </View>
          ) : (
            <View className="w-10/12 mx-auto mt-5 mb-20">
              {isFilterApplied && <BackButton handlePress={resetFilter} />}
              {!isSearchResult ? (
                Object.keys(groups).length > 0 &&
                Object.values(groups).every((arr) => arr.length === 0) ? (
                  <Text style={styles.noResultsText}>No groups found.</Text>
                ) : (
                  Object.keys(groups).map(
                    (category) =>
                      groups[category].length > 0 && (
                        <GroupSection
                          key={category}
                          category={category}
                          groups={groups[category]}
                        />
                      )
                  )
                )
              ) : searchResults.length > 0 ? (
                <>
                  <BackButton
                    handlePress={() => {
                      resetGroups();
                    }}
                  />
                  <View className="flex-row flex-wrap">
                    {searchResults.map((group) => (
                      <Group key={group.id} name={group.name} id={group.id} />
                    ))}
                  </View>
                </>
              ) : (
                <>
                  <BackButton
                    handlePress={() => {
                      resetGroups();
                    }}
                  />
                  <Text style={styles.noResultsText}>No groups found</Text>
                </>
              )}
            </View>
          )}

          <GroupFilter
            visible={isFilterVisible}
            onRequestClose={() => setIsFilterVisible(false)}
            animationType="slide"
            presentationStyle="formSheet"
            onFilterSelect={handleFilterSelect}
            groupTypes={groupTypes}
          />
        </ScrollView>

        {userRole === "Faculty/Staff" ? (
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: "/group/create" })}
          >
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noResultsText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  addBtn: {
    position: "absolute",
    bottom: 38,
    right: 20,
    backgroundColor: "#22c55e",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
