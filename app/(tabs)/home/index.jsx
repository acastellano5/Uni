import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
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
  getPostsByTime,
  getGroupById,
  getFollowingPosts,
} from "../../../lib/useFirebase";
import { useFocusEffect } from '@react-navigation/native';

const tabs = ["Following", "Community"];

export default function Home() {
  const { loading, isLogged, isVerified, orgId } = useGlobalContext();

  useEffect(() => {
    if (!loading && isLogged && isVerified) {
      // Proceed to load data
    } else {
      router.replace("//index");
    }
  }, [loading, isLogged, isVerified]);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserInfo = await getCurrentUser();
        const user = await getUserAttributes(currentUserInfo.uid);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const combinePosts = useCallback(async (postsArr) => {
    const posts = await Promise.all(postsArr.map(async (post) => {
      if (post.authorType === "user") {
        const user = await getUserAttributes(post.author);
        return {
          ...post,
          type: "user",
          authorName: user.fullName,
          authorId: user.id,
          authorType: user.orgs[orgId].role,
        };
      } else if (post.authorType === "group") {
        const group = await getGroupById(post.author, orgId);
        return {
          ...post,
          type: "group",
          authorName: group.name,
          authorId: group.id,
          authorType: group.category,
        };
      }
      return post;
    }));
    return posts;
  }, [orgId]);

  const getCommunityPosts = useCallback(async () => {
    try {
      setPostsLoading(true);
      const communityPosts = await getPostsByTime(orgId);
      const combinedPosts = await combinePosts(communityPosts);
      setPosts(combinedPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setPostsLoading(false);
    }
  }, [orgId, combinePosts]);

  const getFollowingTabPosts = useCallback(async () => {
    try {
      setPostsLoading(true);
      const followingPosts = await getFollowingPosts(orgId);
      const combinedPosts = await combinePosts(followingPosts);
      setPosts(combinedPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setPostsLoading(false);
    }
  }, [orgId, combinePosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (activeTab === "Following") {
      await getFollowingTabPosts();
    } else if (activeTab === "Community") {
      await getCommunityPosts();
    }
    setRefreshing(false);
  }, [activeTab, getFollowingTabPosts, getCommunityPosts]);

  const handlePostDelete = useCallback((postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (Object.keys(currentUser).length > 0) {
        if (activeTab === "Following") {
          getFollowingTabPosts();
        } else if (activeTab === "Community") {
          getCommunityPosts();
        }
      }
    }, [activeTab, currentUser, getFollowingTabPosts, getCommunityPosts])
  );

  return (
    <SafeAreaView className="h-full bg-secondary">
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#22c55e"]}
              tintColor="#22c55e"
            />
          }
        >
          {postsLoading && !refreshing ? (
            <ActivityIndicator size="large" color="#22c55e" />
          ) : (
            posts.map((post, index) => (
              <Post
                key={post.postId || index}
                containerStyles="w-10/12 mx-auto mb-10"
                post={post}
                onDelete={handlePostDelete}
              />
            ))
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/post/create",
              params: { authorType: "user" },
            })
          }
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
