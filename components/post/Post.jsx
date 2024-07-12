import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Comments from "./CommentsSection";
import { router } from "expo-router";
import { formatDistance } from "date-fns";
import { getCurrentUser } from "../../lib/firebase";
import { delPost } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const PostContent = ({ post, cuid, onDelete }) => {
  const { orgId } = useGlobalContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  let postedAtDate;
  if (post.source === "PostSection") {
    postedAtDate = new Date(post.postedAt * 1000);
  } else {
    postedAtDate = new Date(post.postedAt.seconds * 1000);
  }

  const handleDelete = async () => {
    try {
      await delPost(orgId, post.postId);
      onDelete(post.postId); // call the onDelete callback with the post ID
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (post.type === "user") {
                router.push({
                  pathname: "/profile/profileShow",
                  params: { uid: post.author },
                });
              } else {
                router.push({
                  pathname: "/group",
                  params: { id: post.author },
                });
              }
            }}
          >
            <FontAwesome name="user-circle" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="ml-5"
            activeOpacity={0.8}
            onPress={() => {
              if (post.type === "user") {
                router.push({
                  pathname: "/profile/profileShow",
                  params: { uid: post.author },
                });
              } else {
                router.push({
                  pathname: "/group",
                  params: { id: post.author },
                });
              }
            }}
          >
            <Text>{post.authorName}</Text>
            {/* potentially add class if role is student or alumni */}
            <Text>{post.authorType}</Text>
          </TouchableOpacity>
        </View>
        {cuid === post.author ? (
          // delete button for post
          <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
            <FontAwesome name="trash-o" size={24} color="red" />
          </TouchableOpacity>
        
        ) : null}
      </View>

      {/* actual post */}
      <Image
        source={{ uri: post.content }}
        resizeMode="cover"
        className="w-full h-[200] rounded-md"
      />

      {/* like, comment, save */}
      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          {/* like */}
          <View className="flex-row items-center">
            <FontAwesome name="heart-o" size={24} color="black" />
            <Text className="text-base ml-2">234</Text>
          </View>

          {/* comment */}
          <View className="flex-row items-center ml-10">
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <FontAwesome name="commenting-o" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-base ml-2">234</Text>
          </View>
        </View>
      </View>

      {/* caption */}
      <Text className="mt-3">{post.caption}</Text>

      {/* View comments button */}

      <TouchableOpacity
        className="mt-3"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="font-semibold text-darkGray">View Comments</Text>
      </TouchableOpacity>

      {/* time */}
      <Text className="font-semibold mt-3">
        {formatDistance(postedAtDate, new Date(), { addSuffix: true })}
      </Text>

      {/* comments section modal */}
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
    const fetchCurrentUserId = async () => {
      const cuser = await getCurrentUser();
      setCuid(cuser.uid);
      setLoading(false); // Set loading to false after fetching the user ID
    };
    fetchCurrentUserId();
  }, []);

  if (!loading) {
    return (
      <View className={containerStyles}>
        <PostContent post={post} cuid={cuid} onDelete={onDelete} />
      </View>
    );
  }
};

export default PostContainer;
