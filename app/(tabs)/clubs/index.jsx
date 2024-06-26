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
import ClubSection from "../../../components/clubs/ClubSection";
import { getClubsByType, getClubsByName } from "../../../lib/firebase";
import Club from "../../../components/clubs/Club";
import BackButton from "../../../components/BackButton";
import ClubFilter from "../../../components/clubs/ClubFilter";

export default function Clubs() {
  // set state of clubs
  const [clubs, setClubs] = useState({
    Technology: [],
    Arts: [],
    Athletic: [],
    Academic: [],
    Service: [],
  });

  // set state for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      const clubTypes = [
        "Technology",
        "Arts",
        "Athletic",
        "Academic",
        "Service",
      ];
      const clubData = {};

      for (const type of clubTypes) {
        // returns array of clubs based on type passed in
        const clubsByType = await getClubsByType(type);
        // assigns the type key (ex. Technology) to club data
        // will look something like this:
        //      Technology: [array]
        //      Arts: [array]
        //      Athletic [array]
        clubData[type] = clubsByType;
      }

      // sets the state of clubs
      setClubs(clubData);
      setLoading(false); // set loading to false once data is fetched
    };

    // calls fetchClubs when club tab loads
    fetchClubs();
  }, []);

  // set state for the search input's value
  const [searchValue, setSearchValue] = useState("");

  // state for if there are search results it will display them
  const [isSearchResult, setIsSearchResult] = useState(false);

  // state for the search results themselves (the clubs)
  const [searchResults, setSearchResults] = useState([]);

  // executes when search is submitted
  const onSubmitSearch = async () => {
    // make sure that search value isn't empty
    if (!searchValue.trim()) {
      return;
    }

    // fetch club result
    const clubsResult = await getClubsByName(searchValue);
    setIsSearchResult(true);
    setSearchResults(clubsResult ? clubsResult : []);
  };

  // state for filter visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // state for whether a filter is applied
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // callback function to update clubs state when a filter is selected
  const handleFilterSelect = async (selectedCategory) => {
    const filteredClubs = await getClubsByType(selectedCategory); // get clubs by selected category
    setClubs({ [selectedCategory]: filteredClubs }); // update state with filtered clubs
    setIsFilterApplied(true); // indicate that a filter is applied
  };

  // function to reset filter and show all clubs
  const resetFilter = async () => {
    setLoading(true); // show loading indicator
    const clubTypes = [
      "Technology",
      "Arts",
      "Athletic",
      "Academic",
      "Service",
    ];
    const clubData = {};

    for (const type of clubTypes) {
      const clubsByType = await getClubsByType(type); // get clubs by each type
      clubData[type] = clubsByType; // update state with clubs by type
    }

    setClubs(clubData); // set state of clubs
    setLoading(false); // hide loading indicator
    setIsFilterApplied(false); // indicate that the filter is reset
  };

  return (
    <SafeAreaView className="h-full bg-black">
      {/* Header */}
      <Header title="Clubs" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl">
        {loading ? (
          // Display ActivityIndicator while loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.loadingText}>Loading clubs...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search bar */}
            <SearchBar
              placeholder="Search clubs and activities"
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

            {/* clubs */}
            <View className="w-10/12 mx-auto mt-5 mb-20">
              {/* BackButton appears when a filter is applied */}
              {isFilterApplied && (
                <BackButton
                  handlePress={resetFilter} // reset filter to show all clubs
                />
              )}
              {!isSearchResult ? (
                Object.keys(clubs).map((category) =>
                  clubs[category].length > 0 ? (
                    <ClubSection
                      key={category}
                      category={category}
                      clubs={clubs[category]}
                    />
                  ) : null
                )
              ) : searchResults.length > 0 ? (
                <>
                  {/* back to all clubs */}
                  <BackButton
                    handlePress={() => {
                      setSearchValue("");
                      setIsSearchResult(false);
                      setSearchResults([]);
                    }}
                  />
                  {/* if club was found it will render */}
                  {searchResults.map((club) => (
                    <Club key={club.id} name={club.name} id={club.id} />
                  ))}
                </>
              ) : (
                // if club wasn't found, this will render
                <>
                  {/* back to all clubs */}
                  <BackButton
                    handlePress={() => {
                      setSearchValue("");
                      setIsSearchResult(false);
                      setSearchResults([]);
                    }}
                  />
                  <Text style={styles.noResultsText}>No clubs found</Text>
                </>
              )}
            </View>

            {/* club filter */}
            <ClubFilter
              visible={isFilterVisible}
              onRequestClose={() => setIsFilterVisible(false)}
              animationType="slide"
              presentationStyle="formSheet"
              onFilterSelect={handleFilterSelect} // pass handleFilterSelect to ClubFilter
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
