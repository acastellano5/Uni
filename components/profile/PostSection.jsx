import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import pongImage from "../../assets/images/pingpongbg.png";
import { router } from "expo-router";
import { getUserAttributes } from "../../lib/useFirebase";

const PostImage = ({ post }) => {
  // const [ postAuthor, setPostAuthor ] = useState({})
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await getUserAttributes(post.author)
  //   }
  //   fetchUser()
  // }, [])

  const postParam = {
    ...post,
    source: "PostSection",
    postedAt: post.postedAt.seconds,
  };
  
  return (
    <TouchableOpacity
      className="w-1/4 h-[9vh] p-1"
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/post",
          params: postParam,
        })
      }
    >
      <Image
        source={post.content ? { uri: post.content } : { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUs55nkjiEFR-2RL9nfedkXcYZCAcWNlfLpg&s" }}
        className="w-full h-full rounded-sm"
      />
    </TouchableOpacity>
  );
};

const PostSection = ({ posts }) => {
  return (
    <View>
      <Text className="text-lg font-medium mb-1">Posts</Text>
      {posts.length > 0 ? (
        <View className="flex-row flex-wrap">
          {posts.map((post, index) => (
            <PostImage key={index} post={post} />
          ))}
        </View>
      ) : (
        <Text className="text-center mb-5 text-[#888] text-base">
          No posts yet
        </Text>
      )}
    </View>
  );
};

export default PostSection;

const styles = StyleSheet.create({
  imageStyles: {
    width: "25%",
    height: "5vh",
    objectFit: "cover",
  },
});
