import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import EventIcon from "../events/EventIcon";
import PostSection from "../profile/PostSection";
import { getPostByGroup } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const GroupInfo = ({ group, onRefresh, refreshing }) => {
  const { orgId } = useGlobalContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupPosts = async () => {
      let groupPosts = await getPostByGroup(group.id, orgId);
      groupPosts = groupPosts.map((post) => {
        return {
          ...post,
          type: "group",
          authorName: group.name,
          authorId: group.id,
          authorType: group.category,
        };
      });

      setPosts(groupPosts);
      setLoading(false);
    };
    fetchGroupPosts();
  }, [group]);

  if (loading) {
    return (
        <ActivityIndicator size="large" color="#22c55e" />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="h-full" refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={["#22c55e"]}
        tintColor="#22c55e"
      />
    }>
      <View className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
        <Text className="text-base font-semibold mb-2">Description</Text>
        <View className="bg-lightGreen mb-3">
          <Text className="text-[#5e5e5e] p-2 rounded-lg">
            {group.description}
          </Text>
        </View>
        <PostSection posts={posts} />
      </View>
    </ScrollView>
  );
};

export default GroupInfo;
