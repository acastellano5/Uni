import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import Header from "../../../components/Header";
import Post from "../../../components/post/Post";
import TabsDisplay from "../../../components/TabsDisplay";
import { useGlobalContext } from "../../../context/globalProvider";
import { getUserAttributes, getPostsByTime, getGroupById, getFollowingPosts } from "../../../lib/useFirebase";
import { getCurrentUser } from "../../../lib/firebase";

const tabs = ["Following", "Community"]; // Tab options for the screen

export default function Home() {
  const { loading, isLogged, isVerified, orgId, userRole } = useGlobalContext(); // Global context values
  const [activeTab, setActiveTab] = useState(tabs[0]); // Active tab state
  const [currentUser, setCurrentUser] = useState({}); // Current user data
  const [posts, setPosts] = useState([]); // Posts data
  const [postsLoading, setPostsLoading] = useState(true); // Loading state for posts
  const [refreshing, setRefreshing] = useState(false); // Refresh control state

  // Redirect if user is not logged in or verified
  useEffect(() => {
    if (!loading && isLogged && isVerified) {
      fetchUserData();
    } else {
      router.replace("//index");
    }
  }, [loading, isLogged, isVerified]);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const userInfo = await getCurrentUser();
      const user = await getUserAttributes(userInfo.uid);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Combine post data with additional author details
  const combinePosts = useCallback(async (postsArr) => {
    return Promise.all(
      postsArr.map(async (post) => {
        if (post.authorType === "user") {
          const user = await getUserAttributes(post.author);
          return { ...post, type: "user", authorName: user.fullName, authorType: user.orgs[orgId]?.role };
        }
        if (post.authorType === "group") {
          const group = await getGroupById(post.author, orgId);
          return { ...post, type: "group", authorName: group.name, authorType: group.category };
        }
        return post;
      })
    );
  }, [orgId]);

  // Fetch and set posts
  const fetchPosts = useCallback(async (fetchFunction) => {
    try {
      setPostsLoading(true);
      const fetchedPosts = await fetchFunction(orgId, userRole);
      const combinedPosts = await combinePosts(fetchedPosts);
      setPosts(combinedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setPostsLoading(false);
    }
  }, [combinePosts, orgId, userRole]);

  // Fetch posts for each tab
  const fetchCommunityPosts = useCallback(() => fetchPosts(getPostsByTime), [fetchPosts]);
  const fetchFollowingPosts = useCallback(() => fetchPosts(getFollowingPosts), [fetchPosts]);

  // Refresh control handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    activeTab === "Following" ? await fetchFollowingPosts() : await fetchCommunityPosts();
    setRefreshing(false);
  }, [activeTab, fetchFollowingPosts, fetchCommunityPosts]);

  // Handle post deletion
  const handlePostDelete = useCallback((postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
  }, []);

  // Fetch posts when activeTab or user changes
  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      activeTab === "Following" ? fetchFollowingPosts() : fetchCommunityPosts();
    }
  }, [activeTab, currentUser, fetchFollowingPosts, fetchCommunityPosts]);

  // Render a single post
  const renderPost = useMemo(() => ({ item }) => (
    <Post
      containerStyles="w-10/12 mx-auto mb-10"
      post={item}
      onDelete={handlePostDelete}
    />
  ), [handlePostDelete]);

  // Extract unique key for each post
  const keyExtractor = useCallback((item) => item.postId.toString(), []);

  return (
    <SafeAreaView className="h-full bg-primary">
      <Header title="Home" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
        {/* Tabs for switching views */}
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3 w-3/6"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />

        {/* Posts or Loading Indicator */}
        {postsLoading && !refreshing ? (
          <ActivityIndicator size="large" color="#063970" />
        ) : posts.length > 0 ? (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#063970"]}
                tintColor="#063970"
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 12 }}
          />
        ) : (
          <Text className="text-center text-darkGray text-base mt-10">No posts yet.</Text>
        )}

        {/* Add Post Button */}
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => router.push({ pathname: "/post/create", params: { authorType: "user" } })}
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
    bottom: 38,
    right: 20,
    backgroundColor: "#063970",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
