import { View, Text, Image, TouchableOpacity, Alert, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Comments from "./CommentsSection";
import { router } from "expo-router";
import { formatDistance } from "date-fns";
import { getCurrentUser } from "../../lib/firebase";
import { delPost, getDownloadURL } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import { FontAwesome } from "@expo/vector-icons";

const PostContent = ({ post, cuid, onDelete }) => {
  const { orgId } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [image, setImage] = useState(post.content);


  const postedAtDate =
    post.source === "PostSection"
      ? new Date(post.postedAt * 1000)
      : new Date(post.postedAt.seconds * 1000);

  const navigateToProfile = () => {
    const route = post.type === "user" ? "/profile/profileShow" : "/group";
    const params =
      post.type === "user" ? { uid: post.author } : { id: post.author };
    router.push({ pathname: route, params });
  };

  const handleDelete = async () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await delPost(orgId, post.postId);
            onDelete(post.postId);
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        },
      },
    ]);
  };

  useEffect(async () => {
    const contentLink = await getDownloadURL(post.postId)
    Image.getSize(contentLink, (width, height) => {
      setImageAspectRatio(width / height);
      setImage(contentLink)
    });
  }, [post]);

  return (
    <>
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          {/* author info */}
          <TouchableOpacity activeOpacity={0.8} onPress={navigateToProfile}>
            <FontAwesome name="user-circle" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-5"
            activeOpacity={0.8}
            onPress={navigateToProfile}
          >
            <Text>{post.authorName}</Text>
            <Text>{post.authorType}</Text>
          </TouchableOpacity>
        </View>
        {cuid === post.author || cuid === post.writtenBy ? (
          <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
            <FontAwesome name="trash-o" size={24} color="red" />
          </TouchableOpacity>
        ) : null}
      </View>
      {/* post content */}
      <Image
        source={{ uri: image }}
        className="rounded-md"
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: imageAspectRatio,
          resizeMode: imageAspectRatio > 1 ? "cover" : "contain"
        }}
      />
      <View className="mt-3">
        <Text className="text-base font-semibold mb-1">
          {likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
        </Text>
        <View className="flex-row items-center">
          {/* like button */}
          <LikeButton
            postId={post.postId}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
          />
          {/* comment button */}
          <CommentButton
            setIsModalVisible={setIsModalVisible}
            initialComments={post.comments.length}
          />
        </View>
      </View>
      <Text className="mt-3">{post.caption}</Text>
      {/* opens up comments */}
      <TouchableOpacity
        className="mt-3"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="font-semibold text-darkGray">View Comments</Text>
      </TouchableOpacity>
      {/* date of post */}
      <Text className="font-semibold mt-3">
        {formatDistance(postedAtDate, new Date(), { addSuffix: true })}
      </Text>
      {/* comment modal */}
      <Comments
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
        post={post}
        currentUserId={cuid}
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
