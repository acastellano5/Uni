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

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

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
            />

            {/* clubs */}
            <View className="w-10/12 mx-auto mt-5 mb-20">
              {/* if the user didn't search anything, render all the clubs as normal */}
              {!isSearchResult ? (
                Object.keys(clubs).map((category) =>
                  clubs[category].length > 0 ? (
                    <ClubSection
                      key={category}
                      category={category}
                      clubs={clubs[category]}
                    />
                  ) : null
                ) // if the user did search for a club, render the club here
              ) : searchResults.length > 0 ? ( // checks if club was found
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
