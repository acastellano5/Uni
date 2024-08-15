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

const tabs = ["Following", "Community"];

export default function Home() {
  const { loading, isLogged, isVerified, orgId, userRole } = useGlobalContext();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1); // For pagination
  const [loadingMore, setLoadingMore] = useState(false); // For indicating more data is loading

  useEffect(() => {
    if (!loading && isLogged && isVerified) {
      fetchUserData();
    } else {
      router.replace("//index");
    }
  }, [loading, isLogged, isVerified]);

  const fetchUserData = async () => {
    try {
      const currentUserInfo = await getCurrentUser();
      const user = await getUserAttributes(currentUserInfo.uid);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const combinePosts = useCallback(async (postsArr) => {
    const posts = await Promise.all(postsArr.map(async (post) => {
      if (post.authorType === "user") {
        const user = await getUserAttributes(post.author);
        return {
          ...post,
          type: "user",
          authorName: user.fullName,
          authorId: user.id,
          authorType: user.orgs[orgId]?.role,
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

  const getPosts = useCallback(async (fetchPosts, page) => {
    try {
      if (page === 1) setPostsLoading(true);
      else setLoadingMore(true);

      const posts = await fetchPosts(orgId, userRole, page); // Pass page parameter to fetch function
      const combinedPosts = await combinePosts(posts);
      setPosts((prevPosts) => page === 1 ? combinedPosts : [...prevPosts, ...combinedPosts]);
    } catch (error) {
      console.log(error);
    } finally {
      setPostsLoading(false);
      setLoadingMore(false);
    }
  }, [combinePosts, orgId, userRole]);

  const getCommunityPosts = useCallback(() => getPosts(getPostsByTime, page), [getPosts, page]);
  const getFollowingTabPosts = useCallback(() => getPosts(getFollowingPosts, page), [getPosts, page]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1); // Reset page number on refresh
    activeTab === "Following" ? await getFollowingTabPosts() : await getCommunityPosts();
    setRefreshing(false);
  }, [activeTab, getFollowingTabPosts, getCommunityPosts]);

  const handlePostDelete = useCallback((postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
  }, []);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setPage(1); // Reset page number when user or tab changes
      activeTab === "Following" ? getFollowingTabPosts() : getCommunityPosts();
    }
  }, [activeTab, currentUser, getFollowingTabPosts, getCommunityPosts]);

  const loadMorePosts = useCallback(() => {
    if (!loadingMore && !refreshing) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loadingMore, refreshing]);

  const renderItem = useMemo(() => ({ item }) => (
    <Post
      containerStyles="w-10/12 mx-auto mb-10"
      post={item}
      onDelete={handlePostDelete}
    />
  ), [handlePostDelete]);

  const keyExtractor = useCallback((item) => item.postId.toString(), []);

  return (
    <SafeAreaView className="h-full bg-primary">
      <Header title="Home" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3 w-3/6"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />
        {postsLoading && !refreshing ? (
          <ActivityIndicator size="large" color="#063970" />
        ) : (
          posts.length > 0 ? (
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#063970"]}
                  tintColor="#063970"
                />
              }
              onEndReached={loadMorePosts} // Lazy loading trigger
              onEndReachedThreshold={0.5} // Trigger when 50% of the list is left
              ListFooterComponent={loadingMore && <ActivityIndicator size="large" color="#063970" />} // Loading indicator at the end
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 12 }}
            />
          ) : (
            <Text className="text-center text-darkGray text-base mt-10">No posts yet.</Text>
          )
        )}
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
