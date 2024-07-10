import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import CustomButton from "../../components/CustomButton";
import InfoBox from "../../components/profile/InfoBox";
import PostSection from "../../components/profile/PostSection";
import BackHeader from "../../components/BackHeader";
import Settings from "../../components/profile/settings/Settings";
import { getCurrentUser } from "../../lib/firebase";
import {
  getUserAttributes,
  getGroupById,
  getPostByAuthor,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const Profile = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();

  // set settings modal state
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  // set current user state
  const [currentUser, setCurrentUser] = useState({});

  // set groups state
  const [groups, setGroups] = useState([]);

  // set posts state
  const [posts, setPosts] = useState([]);

  // set loading state
  const [loading, setLoading] = useState(true);

  // fetch current user and set it to the current user state
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      const currentUserAttributes = await getUserAttributes(currentUser.uid);
      setCurrentUser(currentUserAttributes);

      const groupIds = currentUserAttributes.orgs[orgId].groups;
      const fetchedGroups = await Promise.all(
        groupIds.map(async (groupId) => {
          const group = await getGroupById(groupId, orgId);
          return { name: group.name, id: group.id, orgId: group.orgId };
        })
      );
      setGroups(fetchedGroups);

      // fetch posts the user has
      let userPosts = await getPostByAuthor(currentUser.uid, orgId);
      userPosts = userPosts.map((post) => {
        return {
          ...post,
          type: "user",
          authorName: currentUserAttributes.fullName,
          authorId: currentUserAttributes.id,
          authorType: currentUserAttributes.orgs[orgId].role,
        };
      });
      setPosts(userPosts);

      setLoading(false); // set loading to false after data is fetched
    };

    fetchCurrentUser();
  }, []);

  return (
    <SafeAreaView className="h-full bg-black">
      <BackHeader title="My Profile" containerStyles="w-11/12 mx-auto" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        {loading ? (
          <SafeAreaView className="h-full items-center justify-center">
            <ActivityIndicator size="large" color="#22c55e" />
          </SafeAreaView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* profile image with edit and settings buttons */}
            <View className="items-center justify-center">
              <Image
                source={ProfilePic}
                style={styles.profilePic}
                className="mb-2"
              />
              <Text className="text-lg font-medium">
                {currentUser.fullName}
              </Text>

              <View className="flex-row">
                <CustomButton
                  title="Edit"
                  textStyles="text-primary text-sm font-semibold"
                />

                <CustomButton
                  title="Settings"
                  containerStyles="ml-2"
                  textStyles="text-darkGray text-sm font-semibold"
                  handlePress={() => setIsSettingsVisible(true)}
                />
              </View>
            </View>

            {/* bio section */}
            <View className="bg-white w-11/12 mx-auto mt-5 px-3 py-2 rounded-lg mb-10">
              <Text className="text-lg font-medium mb-1">Bio</Text>
              <View className="bg-lightGreen mb-3 rounded-lg">
                <Text className="text-[#5e5e5e] p-2">
                  {currentUser.bio ? currentUser.bio : "No bio."}
                </Text>
              </View>

              {/* interests section */}
              <InfoBox title="Interests" info={currentUser.interests} />

              {/* groups section */}
              <InfoBox title="Groups" info={groups} />

              {/* classes section */}
              <InfoBox title="Classes" />

              <PostSection posts={posts}/>

              <Settings
                visible={isSettingsVisible}
                onRequestClose={() => {
                  setIsSettingsVisible(false);
                }}
                animationType="slide"
                presentationStyle="formSheet"
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});

export default Profile;
