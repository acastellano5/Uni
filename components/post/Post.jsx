import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Comments from "./CommentsSection";
import { router } from "expo-router";
import { formatDistance } from "date-fns";
import { getCurrentUser } from "../../lib/firebase";
import { delPost } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import { FontAwesome } from "@expo/vector-icons";

const PostContent = ({ post, cuid, onDelete }) => {
  const { orgId } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const postedAtDate = post.source === "PostSection" 
    ? new Date(post.postedAt * 1000) 
    : new Date(post.postedAt.seconds * 1000);

  const navigateToProfile = () => {
    const route = post.type === "user" ? "/profile/profileShow" : "/group";
    const params = post.type === "user" ? { uid: post.author } : { id: post.author };
    router.push({ pathname: route, params });
  };

  const handleDelete = async () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: async () => {
          try {
            await delPost(orgId, post.postId);
            onDelete(post.postId);
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        }
      }
    ]);
  };

  return (
    <>
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <TouchableOpacity activeOpacity={0.8} onPress={navigateToProfile}>
            <FontAwesome name="user-circle" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-5" activeOpacity={0.8} onPress={navigateToProfile}>
            <Text>{post.authorName}</Text>
            <Text>{post.authorType}</Text>
          </TouchableOpacity>
        </View>
        {cuid === post.author && (
          <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
            <FontAwesome name="trash-o" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <Image source={{ uri: post.content }} resizeMode="cover" className="w-full h-[200] rounded-md" />
      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <LikeButton postId={post.postId} initialLikes={post.likes.length} />
          <CommentButton />
        </View>
      </View>
      <Text className="mt-3">{post.caption}</Text>
      <TouchableOpacity className="mt-3" onPress={() => setIsModalVisible(true)}>
        <Text className="font-semibold text-darkGray">View Comments</Text>
      </TouchableOpacity>
      <Text className="font-semibold mt-3">
        {formatDistance(postedAtDate, new Date(), { addSuffix: true })}
      </Text>
      <Comments
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
      />
    </>
  );
};

const PostContainer = ({ containerStyles, post, onDelete }) => {
  const [cuid, setCuid] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      const cuser = await getCurrentUser();
      setCuid(cuser.uid);
      setLoading(false);
    };
    fetchPostData();
  }, []);

  if (loading) return null;

  return (
    <View className={containerStyles}>
      <PostContent post={post} cuid={cuid} onDelete={onDelete} />
    </View>
  );
};

export default PostContainer;
