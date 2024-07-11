import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import GroupSection from "../../../components/groups/GroupSection";
import { getGroupsByCategory, getGroupsByName } from "../../../lib/useFirebase";
import Group from "../../../components/groups/Group";
import BackButton from "../../../components/BackButton";
import GroupFilter from "../../../components/groups/GroupFilter";
import { useGlobalContext } from "../../../context/globalProvider";

export default function Groups() {
  // getting orgId from global context
  const { orgId } = useGlobalContext();

  // set state of groups
  const [groups, setGroups] = useState({
    Technology: [],
    Arts: [],
    Athletic: [],
    Academic: [],
    Service: [],
  });

  // set state for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      const groupTypes = [
        "Technology",
        "Arts",
        "Athletic",
        "Academic",
        "Service",
      ];
      const groupData = {};

      for (const type of groupTypes) {
        // returns array of groups based on type passed in
        const groupsByType = await getGroupsByCategory(type, orgId);
        // assigns the type key (ex. Technology) to group data
        // will look something like this:
        //      Technology: [array]
        //      Arts: [array]
        //      Athletic [array]
        groupData[type] = groupsByType;
      }

      // sets the state of groups
      setGroups(groupData);
      setLoading(false); // set loading to false once data is fetched
    };

    // calls fetchGroups when groups tab loads
    fetchGroups();
  }, []);

  // set state for the search input's value
  const [searchValue, setSearchValue] = useState("");

  // state for if there are search results it will display them
  const [isSearchResult, setIsSearchResult] = useState(false);

  // state for the search results themselves (the groups)
  const [searchResults, setSearchResults] = useState([]);

  // executes when search is submitted
  const onSubmitSearch = async () => {
    // make sure that search value isn't empty
    if (!searchValue.trim()) {
      return;
    }

    // fetch group result
    const groupsResult = await getGroupsByName(searchValue, orgId);
    setIsSearchResult(true);
    setSearchResults(groupsResult ? groupsResult : []);
  };

  // state for filter visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // state for whether a filter is applied
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // callback function to update groups state when a filter is selected
  const handleFilterSelect = async (selectedCategory) => {
    const filteredGroups = await getGroupsByCategory(selectedCategory, orgId); // get groups by selected category
    setGroups({ [selectedCategory]: filteredGroups }); // update state with filtered groups
    setIsFilterApplied(true); // indicate that a filter is applied
  };

  // function to reset filter and show all groups
  const resetFilter = async () => {
    setLoading(true); // show loading indicator
    const groupTypes = ["Technology", "Arts", "Athletic", "Academic", "Service"];
    const groupData = {};

    for (const type of groupTypes) {
      const groupsByType = await getGroupsByCategory(type, orgId); // get groups by each type
      groupData[type] = groupsByType; // update state with groups by type
    }

    setGroups(groupData); // set state of groups
    setLoading(false); // hide loading indicator
    setIsFilterApplied(false); // indicate that the filter is reset
  };

  return (
    <SafeAreaView className="h-full bg-black">
      {/* Header */}
      <Header title="Groups" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl">
        {loading ? (
          // Display ActivityIndicator while loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.loadingText}>Loading groups...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search bar */}
            <SearchBar
              placeholder="Search groups"
              containerStyles="mt-5"
              textValue={searchValue}
              handleChangeText={(e) => setSearchValue(e)}
              handleSubmitEditing={onSubmitSearch}
              onClearSearch={() => {
                setSearchValue("");
                setIsSearchResult(false);
                setSearchResults([]);
              }}
              filterOnPress={() => setIsFilterVisible(true)}
            />

            {/* groups */}
            <View className="w-10/12 mx-auto mt-5 mb-20">
              {/* BackButton appears when a filter is applied */}
              {isFilterApplied && (
                <BackButton
                  handlePress={resetFilter} // reset filter to show all groups
                />
              )}
              {!isSearchResult ? (
                Object.keys(groups).length > 0 &&
                Object.values(groups).every((arr) => arr.length === 0) ? (
                  <Text style={styles.noResultsText}>No groups found.</Text>
                ) : (
                  Object.keys(groups).map((category) =>
                    groups[category].length > 0 ? (
                      <GroupSection
                        key={category}
                        category={category}
                        groups={groups[category]}
                      />
                    ) : null
                  )
                )
              ) : searchResults.length > 0 ? (
                <>
                  {/* back to all groups */}
                  <BackButton
                    handlePress={() => {
                      setSearchValue("");
                      setIsSearchResult(false);
                      setSearchResults([]);
                    }}
                  />
                  {/* if group was found it will render */}
                  <View className="flex-row flex-wrap">
                    {searchResults.map((group) => (
                      <Group key={group.id} name={group.name} id={group.id} />
                    ))}
                  </View>
                </>
              ) : (
                // if group wasn't found, this will render
                <>
                  {/* back to all groups */}
                  <BackButton
                    handlePress={() => {
                      setSearchValue("");
                      setIsSearchResult(false);
                      setSearchResults([]);
                    }}
                  />
                  <Text style={styles.noResultsText}>No groups found</Text>
                </>
              )}
            </View>

            {/* group filter */}
            <GroupFilter
              visible={isFilterVisible}
              onRequestClose={() => setIsFilterVisible(false)}
              animationType="slide"
              presentationStyle="formSheet"
              onFilterSelect={handleFilterSelect} // pass handleFilterSelect to GroupFilter
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#000",
  },
  noResultsText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
});
