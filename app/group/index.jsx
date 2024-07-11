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
import TabsDisplay from "../../components/TabsDisplay";
import GroupInfo from "../../components/groups/GroupInfo";
import GroupMembers from "../../components/groups/GroupMembers";
import BackHeader from "../../components/BackHeader";
import {
  getGroupById,
  joinGroup,
  isUserInGroup,
  leaveGroup,
  ifGroupFollowed,
  unfollowGroup, 
  followGroup
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { AntDesign } from '@expo/vector-icons';

const tabs = ["Info", "Members"];

const GroupHome = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();

  // retrieve params from request
  const params = useLocalSearchParams();
  const { id } = params;

  // setting tabs state
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // setting group state
  const [group, setGroup] = useState(null);

  // function gets group data
  const fetchGroup = async () => {
    if (!id) {
      console.log("ID is not available");
      return;
    }

    // console.log("Fetching group data for ID:", id);
    try {
      const groupData = await getGroupById(id, orgId);
      if (groupData) {
        // console.log("Group data fetched:", groupData);
        setGroup(groupData);
      } else {
        console.log("No group data found");
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };

  // fetching group data
  useEffect(() => {
    fetchGroup();
  }, [id]);

  // isInGroup state
  const [isInGroup, setIsInGroup] = useState(false);
  //
  const [isFollowingGroup, setIsFollowingGroup] = useState(false);

  useEffect(() => {
    // fetch to see if the user is in the group or not
    const fetchStatus = async () => {
      if (group) {
        const status = await isUserInGroup(group.id, orgId);
        setIsInGroup(status);

        const isFollowing = await ifGroupFollowed(group.id, orgId);
        setIsFollowingGroup(isFollowing);
      }
    };
    fetchStatus();
  }, [group]);

  const handleJoinOrLeaveGroup = async () => {
    if (isInGroup) {
      Alert.alert("Leave Group", "Are you sure you want to leave this group?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await leaveGroup(orgId, group.id);
            setIsInGroup(false);
            await fetchGroup(); // Fetch the updated group members list
          },
        },
      ]);
    } else {
      await joinGroup(orgId, group.id);
      setIsInGroup(true);
      await fetchGroup(); // Fetch the updated group members list
    }
  };

  const handleFollowOrUnfollowGroup = async () => {
    if (isFollowingGroup) {
      await unfollowGroup(group.id, orgId);
      setIsFollowingGroup(false);
    } else {
      await followGroup(group.id, orgId);
      setIsFollowingGroup(true);
    }
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Info":
        return <GroupInfo group={group} />;

      case "Members":
        return (
          <GroupMembers members={group.members} moderators={group.moderators} />
        );

      default:
        return null;
    }
  };

  if (!group) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      {/* group background image */}
      <ImageBackground
        className="w-full h-[40vh] pb-5"
        source={{ uri: `${group.image}` }}
      >
        <SafeAreaView className="w-11/12 mx-auto h-full justify-between z-10">
          {/* back button and ai btn */}
          <BackHeader />

          {/* group name and join button */}
          <View className="flex-row justify-between items-center">
            {/* group name */}
            <View className="bg-tertiary py-2 px-4 rounded" style={{ maxWidth: "60%" }}>
              <Text className="text-white text-base font-semibold">
                {group.name}
              </Text>
            </View>

            {/* buttons */}
            <View className="flex-row items-center">
              {!isInGroup ? (
                <TouchableOpacity
                  className="bg-white p-2 rounded mr-2"
                  activeOpacity={0.8}
                  onPress={handleFollowOrUnfollowGroup}
                >
                  {isFollowingGroup ? (
                    <AntDesign name="star" size={24} color="#22c55e" />
                  ) : (
                    <AntDesign name="staro" size={24} color="#22c55e" />
                  )}
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                onPress={handleJoinOrLeaveGroup}
                className="bg-white py-2 px-3 rounded"
                activeOpacity={0.8}
              >
                <Text className="text-primary text-base font-semibold">
                  {isInGroup ? "Leave" : "Join"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <View style={styles.overlay} />
      </ImageBackground>

      {/* group info */}
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

export default GroupHome;
