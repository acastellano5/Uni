import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import CustomButton from "../../components/CustomButton";
import InfoBox from "../../components/profile/InfoBox";
import PostSection from "../../components/profile/PostSection";
import BackHeader from "../../components/BackHeader";
import { useLocalSearchParams, router } from "expo-router";
import Settings from "../../components/profile/settings/Settings";
import {
  getUserAttributes,
  followUser,
  getGroupById,
  ifUserFollowed,
  unfollowUser,
  getPostByAuthor,
  getFollowing
} from "../../lib/useFirebase";
import { getCurrentUser } from "../../lib/firebase";
import { useGlobalContext } from "../../context/globalProvider";
import { useFocusEffect } from "@react-navigation/native";
import FollowingModal from "../../components/profile/FollowingModal";

const ProfileShow = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();

  const params = useLocalSearchParams();
  const [uid, setUid] = useState(params.uid);

  // Setting user state and retrieving user data from the database
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  // settings modal state
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isFollowingVisible, setIsFollowingVisible] = useState(false);

  // set groups state
  const [groups, setGroups] = useState([]);
  // set posts state
  const [posts, setPosts] = useState([]);

  // set following state
  const [ following, setFollowing ] = useState([])

  // set current user state
  const [currentUserId, setCurrentUserId] = useState("");

  // fetch the user's post
  const fetchUserPosts = async () => {
    let userPosts = await getPostByAuthor(uid, orgId);
    userPosts = await Promise.all(
      userPosts.map(async (post) => {
        const author = await getUserAttributes(uid);
        return {
          ...post,
          type: "user",
          authorName: author.fullName,
          authorId: author.id,
          authorType: author.orgs[orgId].role,
        };
      })
    );
    setPosts(userPosts);
  };

  const fetchUserFollowing = async () => {
    const followingUsers = await getFollowing(uid, orgId, true)
    setFollowing(followingUsers)
  }

  // fetch user info and groups
  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        let userResult;
        if (uid) {
          userResult = await getUserAttributes(uid, orgId);
        } else {
          const currentUser = await getCurrentUser();
          userResult = await getUserAttributes(currentUser.uid, orgId);
          setUid(currentUser.uid); // update the state with current user uid
        }

        setUser(userResult);

        // fetch groups the user is a part of
        const groupIds = userResult.orgs[orgId].groups;
        const fetchedGroups = await Promise.all(
          groupIds.map(async (groupId) => {
            const group = await getGroupById(groupId, orgId);
            return { name: group.name, id: group.id, orgId: group.orgId };
          })
        );
        setGroups(fetchedGroups);

        // fetch posts the user has
        fetchUserPosts();


        // fetch following users
        fetchUserFollowing()

        // fetch current user info
        const user = await getCurrentUser();
        setCurrentUserId(user.uid);

        setLoading(false); // Set loading to false once data is fetched
      };

      fetchUsers();
    }, [uid])
  );

  // state to see if current user is following this user
  const [isFollowing, setIsFollowing] = useState(false);

  // set the state to whether or not they are following user
  useEffect(() => {
    const fetchIsFollowing = async () => {
      const isUserFollowing = await ifUserFollowed(uid, orgId);
      setIsFollowing(isUserFollowing);
    };

    fetchIsFollowing();
  }, [uid]);

  return (
    <SafeAreaView className="h-full bg-primary">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        {loading ? (
          // Render loader while loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#063970" />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* profile image with edit and settings buttons */}
            <View className="items-center justify-center">
              
              {user.profilePicture ? (
                              <Image
                              source={{uri: user.profilePicture}}
                              style={styles.profilePic}
                              className="mb-2"
                            />
              ):
              <Image
              source={ProfilePic}
              style={styles.profilePic}
              className="mb-2"
            />}

              {/* for passing in fullName */}
              {/* <Text className="text-lg font-medium mb-2">{`${user.fullName}`}</Text> */}

              <Text className="text-lg font-medium">{user.fullName}</Text>
              {currentUserId !== uid ? (
                <View className="flex-row w-2/3 mx-auto mt-2">
                  <CustomButton
                    title={!isFollowing ? "Follow" : "Unfollow"}
                    containerStyles="border border-primary py-1 w-3/6"
                    textStyles="text-primary text-sm font-semibold"
                    handlePress={() => {
                      if (!isFollowing) {
                        followUser(user.id, orgId);
                        setIsFollowing(true);
                      } else {
                        Alert.alert(`Unfollow ${user.fullName}`, `Are you sure you want to unfollow ${user.fullName}?`, [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          { text: "Yes", onPress: async () => {
                              await unfollowUser(user.id, orgId) 
                              setIsFollowing(false);
                          }},
                        ]);
                      }
                    }}
                  />
                  <CustomButton
                    title="Message"
                    containerStyles="ml-2 border border-primary py-1 w-3/6"
                    textStyles="text-primary text-sm font-semibold"
                  />
                </View>
              ) : (
                <View className="flex-row justify-center mb-4">
                  <CustomButton
                    title="Edit"
                    textStyles="text-primary text-sm font-semibold"
                    handlePress={() =>
                      router.push({
                        pathname: "./editProfile",
                        params: user,
                      })
                    }
                  />

                  <CustomButton
                    title="Following"
                    containerStyles="ml-2"
                    textStyles="text-yellow-500 text-sm font-semibold"
                    handlePress={() => setIsFollowingVisible(true)}
                  />
                  <CustomButton
                    title="Settings"
                    containerStyles="ml-2"
                    textStyles="text-darkGray text-sm font-semibold"
                    handlePress={() => setIsSettingsVisible(true)}
                  />
                </View>
              )}
            </View>

            {/* bio section */}
            <View
              className={`bg-white w-11/12 mx-auto px-3 py-2 rounded-lg mb-10 ${
                currentUserId !== uid ? "mt-5" : null
              }`}
            >
              <Text className="text-lg font-medium mb-1">Bio</Text>
              <View className="bg-lightYellow mb-3 rounded-lg">
                {/* for passing in bio */}
                <Text className="text-[#5e5e5e] p-2">
                  {user.bio ? user.bio : "No bio."}
                </Text>
              </View>

              {/* interests section */}
              {/* for passing in interests */}
              <InfoBox title="Interests" info={user.interests} />

              {/* groups section */}
              <InfoBox title="Groups" info={groups} />

              <PostSection posts={posts} />

              <Settings
                visible={isSettingsVisible}
                onRequestClose={() => {
                  setIsSettingsVisible(false);
                }}
                animationType="slide"
                presentationStyle="formSheet"
              />

              <FollowingModal 
                visible={isFollowingVisible}
                setIsVisible={setIsFollowingVisible}
                animationType="slide"
                presentationStyle="formSheet"
                following={following}
                fetchFollowing={fetchUserFollowing}
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
});

export default ProfileShow;
