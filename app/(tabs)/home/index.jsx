import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const { loading, isLogged, isVerified, orgId, userRole, needsReload, setNeedsReload } = useGlobalContext();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentUser, setCurrentUser] = useState({});
  const [followingPosts, setFollowingPosts] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isMounted = useRef(false);

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

  const fetchPosts = useCallback(async () => {
    try {
      setPostsLoading(true);
      const [following, community] = await Promise.all([
        getFollowingPosts(orgId, userRole),
        getPostsByTime(orgId, userRole),
      ]);
      const combinedFollowingPosts = await combinePosts(following);
      const combinedCommunityPosts = await combinePosts(community);
      setFollowingPosts(combinedFollowingPosts);
      setCommunityPosts(combinedCommunityPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setPostsLoading(false);
    }
  }, [combinePosts, orgId, userRole]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (activeTab === "Following") {
        const following = await getFollowingPosts(orgId, userRole);
        const combinedFollowingPosts = await combinePosts(following);
        setFollowingPosts(combinedFollowingPosts);
      } else {
        const community = await getPostsByTime(orgId, userRole);
        const combinedCommunityPosts = await combinePosts(community);
        setCommunityPosts(combinedCommunityPosts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, [activeTab, combinePosts, orgId, userRole]);

  const handlePostDelete = useCallback((postId) => {
    if (activeTab === "Following") {
      setFollowingPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
    } else {
      setCommunityPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
    }
  }, [activeTab]);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      fetchPosts();
    }
  }, [currentUser, fetchPosts]);

  const renderItem = ({ item }) => (
    <Post
      containerStyles="w-10/12 mx-auto mb-10"
      post={item}
      onDelete={handlePostDelete}
    />
  );

  return (
    <SafeAreaView className="h-full bg-secondary">
      <Header title="Home" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
        <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3 w-3/6"
          textStyles="text-base"
          tabBarStyles="w-10/12 mb-2"
        />
        {postsLoading && !refreshing ? (
          <ActivityIndicator size="large" color="#22c55e" />
        ) : (
          <FlatList
            data={activeTab === "Following" ? followingPosts : communityPosts}
            renderItem={renderItem}
            keyExtractor={(item) => item.postId.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#22c55e"]}
                tintColor="#22c55e"
              />
            }
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.9}
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
    backgroundColor: "#22c55e",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
