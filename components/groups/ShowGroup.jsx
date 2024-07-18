import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsDisplay from "../TabsDisplay";
import GroupInfo from "./GroupInfo";
import GroupMembers from "./GroupMembers";
import GroupEvents from "./GroupEvents";
import GroupHeader from "./GroupHeader";
import CustomButton from "../CustomButton";
import {
  joinGroup,
  isUserInGroup,
  leaveGroup,
  ifGroupFollowed,
  unfollowGroup,
  followGroup,
  isUserModerator,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { AntDesign } from "@expo/vector-icons";

const tabs = ["Info", "Members", "Events"];

const GroupHome = ({ group, fetchGroup, setGroupContent }) => {
  const { orgId } = useGlobalContext();
//   const params = useLocalSearchParams();
//   const { id } = params;

  const [activeTab, setActiveTab] = useState(tabs[0]);
//   const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInGroup, setIsInGroup] = useState(false);
  const [isFollowingGroup, setIsFollowingGroup] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (group) {
        const status = await isUserInGroup(group.id, orgId);
        setIsInGroup(status);

        const isFollowing = await ifGroupFollowed(group.id, orgId);
        setIsFollowingGroup(isFollowing);

        const isGroupModerator = await isUserModerator(group.id, orgId);
        setIsModerator(isGroupModerator);

        setIsLoading(false);
      }
    };
    fetchStatus();
  }, [group]);

  const handleJoinOrLeaveGroup = async () => {
    if (isInGroup || isModerator) {
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
            await fetchGroup();
          },
        },
      ]);
    } else {
      await joinGroup(orgId, group.id);
      setIsInGroup(true);
      await fetchGroup();
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchGroup();
    setRefreshing(false);
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Info":
        return (
          <GroupInfo
            group={group}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );
      case "Members":
        return (
          <GroupMembers
            members={group.members}
            moderators={group.moderators}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );

      case "Events":
        return (
          <GroupEvents
            group={group}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        className="w-full h-[40vh] pb-5"
        source={{ uri: `${group.image}` }}
      >
        <SafeAreaView className="w-11/12 mx-auto h-full justify-between z-10">
          <GroupHeader isModerator={isModerator} group={group} setGroupContent={setGroupContent}/>
          <View className="flex-row justify-between items-center">
            <View
              className="bg-tertiary py-2 px-4 rounded"
              style={{ maxWidth: "70%" }}
            >
              <Text
                className="text-white text-base font-semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {group.name}
              </Text>
            </View>
            <View className="flex-row items-center">
              {!isInGroup && !isModerator ? (
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

              {group.canJoin ? (
                <TouchableOpacity
                  onPress={handleJoinOrLeaveGroup}
                  className="bg-white py-2 px-3 rounded"
                  activeOpacity={0.8}
                >
                  <Text className="text-primary text-base font-semibold">
                    {isInGroup || isModerator ? "Leave" : "Join"}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.overlay} />
      </ImageBackground>
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-11 bottom-10">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3 w-1/3"
          textStyles="text-lg"
          tabBarStyles="mb-5 w-11/12"
        />
        {displayTabContent()}
      </View>
      {isModerator ? (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsModalVisible(true)}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      ) : null}

      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomButton
              title="Create Post"
              containerStyles="bg-primary w-full"
              textStyles="text-white py-2 text-base"
              handlePress={() => {
                setIsModalVisible(!isModalVisible);
                router.push({
                  pathname: "/post/create",
                  params: { authorType: "group", groupId: group.id, orgId },
                });
              }}
            />

            <CustomButton
              title="Create Event"
              containerStyles="bg-primary w-full my-3 mb-5"
              textStyles="text-white py-2 text-base"
              handlePress={() => {
                setIsModalVisible(!isModalVisible);
                router.push({
                  pathname: "/event/create",
                  params: { eventType: "group", groupId: group.id },
                });
              }}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <Text className="text-base">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  floatingButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "#22c55e",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: height * 0.25,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default GroupHome;
