import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import ClubSection from "../../../components/clubs/ClubSection";
import { getClubsByType } from "../../../lib/firebase";

export default function Clubs() {
  // set state of clubs
  const [clubs, setClubs] = useState({
    Technology: [],
    Arts: [],
    Athletic: [],
    Academic: [],
    Service: []
  });

  // set state for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      const clubTypes = ["Technology", "Arts", "Athletic", "Academic", "Service"];
      const clubData = {};

      for (const type of clubTypes) {
        // returns array of clubs based on type passed in
        const clubsByType = await getClubsByType(type);
        // assigns the type key (ex. Technology) to club date
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

  return (
    <SafeAreaView className="h-full bg-black">
      {/* Header */}
      <Header title="Clubs" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        {loading ? (
          // Display ActivityIndicator while loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.loadingText}>Loading clubs...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search bar */}
            <SearchBar placeholder="Search clubs and activities" />

            {/* clubs */}
            <View className="w-10/12 mx-auto mt-5">
              {Object.keys(clubs).map(category => 
                clubs[category].length > 0 ? (
                  <ClubSection key={category} category={category} clubs={clubs[category]} />
                ) : null
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
});
