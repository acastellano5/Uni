import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../../../assets/images/pingpongbg.png";
import TabsDisplay from "../../../components/TabsDisplay";
import ClubInfo from "../../../components/clubs/ClubInfo";
import ClubMembers from "../../../components/clubs/ClubMembers";
import BackHeader from "../../../components/BackHeader";
import {
  getGroupById,
  joinGroup,
  isUserInGroup,
  leaveGroup,
} from "../../../lib/useFirebase";
import { useGlobalContext } from "../../../context/globalProvider";

const tabs = ["Info", "Members"];

const ClubHome = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();

  // retrieve params from request
  const params = useLocalSearchParams();
  const { id } = params;

  // setting tabs state
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // setting club state
  const [club, setClub] = useState(null);

  // function gets club data
  const fetchClub = async () => {
    if (!id) {
      console.log("ID is not available");
      return;
    }

    // console.log("Fetching club data for ID:", id);
    try {
      const clubData = await getGroupById(id, orgId);
      if (clubData) {
        // console.log("Club data fetched:", clubData);
        setClub(clubData);
      } else {
        console.log("No club data found");
      }
    } catch (error) {
      console.error("Error fetching club data:", error);
    }
  };

  // fetching club data
  useEffect(() => {
    fetchClub();
  }, [id]);

  // isInGroup state
  const [isInGroup, setIsInGroup] = useState(false);

  useEffect(() => {
    // fetch to see if the user is in the group or not
    const fetchStatus = async () => {
      if (club) {
        const status = await isUserInGroup(club.id, orgId);
        setIsInGroup(status);
      }
    };
    fetchStatus();
  }, [club]);

  useEffect(() => {
    console.log("Is the user in this group? " + isInGroup);
  }, [isInGroup]);

  const handleJoinOrLeaveGroup = async () => {
    if (isInGroup) {
      Alert.alert(
        "Leave Group",
        "Are you sure you want to leave this group?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await leaveGroup(orgId, club.id);
              setIsInGroup(false);
              await fetchClub(); // Fetch the updated club members list
            },
          },
        ]
      );
    } else {
      await joinGroup(orgId, club.id);
      setIsInGroup(true);
      await fetchClub(); // Fetch the updated club members list
    }
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Info":
        return <ClubInfo club={club} />;

      case "Members":
        return (
          <ClubMembers members={club.members} moderators={club.moderators} />
        );

      default:
        return null;
    }
  };

  if (!club) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      {/* club background image */}
      <ImageBackground
        className="w-full h-[40vh] pb-5"
        source={{ uri: `${club.image}` }}
      >
        <SafeAreaView className="w-11/12 mx-auto h-full justify-between z-10">
          {/* back button and ai btn */}
          <BackHeader />

          {/* club name and join button */}
          <View className="flex-row justify-between items-center">
            <View className="bg-tertiary py-2 px-4 rounded">
              <Text className="text-white text-lg font-semibold">
                {club.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleJoinOrLeaveGroup}
              className="bg-white py-2 px-4 rounded"
              activeOpacity={0.8}
            >
              <Text className="text-primary text-lg font-semibold">
                {isInGroup ? "Leave" : "Join"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.overlay} />
      </ImageBackground>

      {/* club info */}
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-11 bottom-10">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3"
          textStyles="text-lg"
          tabBarStyles="mb-6 w-11/12"
        />

        {displayTabContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default ClubHome;
