import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import Post from "../../../components/post/Post";
import { Feather } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/globalProvider";
import TabsDisplay from "../../../components/TabsDisplay";
import { getCurrentUser } from "../../../lib/firebase";
import {
  getUserAttributes,
  getPostByAuthor,
  getPostsByTime,
  getGroupById,
  getFollowingPosts
} from "../../../lib/useFirebase";

const tabs = ["Following", "Community"];

export default function Home() {
  // auth stuff and orgId
  const { loading, isLogged, isVerified, orgId } = useGlobalContext();
  if (!loading && isLogged && isVerified) {
  } else {
    router.replace("//index");
  }

  // tab functionality
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // get current user info
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUserInfo = await getCurrentUser();
        const currentUser = await getUserAttributes(currentUserInfo.uid);
        setCurrentUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  // fetch posts
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // combine posts function
  const combinePosts = async (postsArr) => {
    const posts = []

    // fetches author info for each post
    for (const post of postsArr) {

      // will execute if author type is user
      if (post.authorType === "user") {
        const user = await getUserAttributes(post.author);

        // adds author info along with post object
        const postWithAuthorInfo = {
          ...post,
          type: "user",
          authorName: user.fullName,
          authorId: user.id,
          authorType: user.orgs[orgId].role
        }

        // pushes newly created post object to posts
        posts.push(postWithAuthorInfo)
      } else if (post.authorType === "group") { // will execute if author type is group
        const group = await getGroupById(post.author, orgId)
        
        const postWithAuthorInfo = {
          ...post, 
          type: "group",
          authorName: group.name,
          authorId: group.id,
          authorType: group.category
        }

        posts.push(postWithAuthorInfo)
      } else {
        continue;
      }

    }

    return posts
  }

  // fetching community posts
  const getCommunityPosts = async () => {
    try {
      setPostsLoading(true);
      // get latest posts from org
      const communityPosts = await getPostsByTime(orgId);
      const posts = await combinePosts(communityPosts)
      setPosts(posts);
    } catch (error) {
      console.log(error)
    } finally {
      setPostsLoading(false);
    }
  };

  // get posts for following tab
  const getFollowingTabPosts = async () => {
    try {
      setPostsLoading(true);
      // get latest posts from people user follows and groups that they follow or are a part of
      const followingPosts = await getFollowingPosts(orgId)
      const posts = await combinePosts(followingPosts)
      setPosts(posts);
    } catch (error) {
      console.log(error)
    } finally {
      setPostsLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    if (activeTab === "Following") {
      await getFollowingTabPosts();
    } else if (activeTab === "Community") {
      await getCommunityPosts();
    }
    setRefreshing(false);
  };

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      if (activeTab === "Following") {
        getFollowingTabPosts()
      } else if (activeTab === "Community") {
        getCommunityPosts();
      } else {
        return null;
      }
    }
  }, [activeTab, currentUser]);

  return (
    <SafeAreaView className="h-full bg-secondary">
      {/* Header */}
      <Header title="Home" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-3"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#22c55e"]} tintColor="#22c55e"/>
          }
        >
          {!refreshing && postsLoading ? (
            <ActivityIndicator size="large" color="#22c55e" />
          ) : (
            posts.map((post, index) => (
              <Post
                key={index}
                containerStyles="w-10/12 mx-auto mb-10"
                post={post}
              />
            ))
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.9}
          onPress={() => router.push("/post/create")}
          className="shadow-lg"
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
