import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import schoolImage from "../../assets/images/school.png";
import Comments from "./CommentsSection";
import { router } from "expo-router";
import { formatDistance } from "date-fns";

const PostContent = ({ post }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let postedAtDate
  if (post.source === "PostSection") {
    postedAtDate = new Date(post.postedAt * 1000);
  } else {
    postedAtDate = new Date(post.postedAt.seconds * 1000);
  }

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
                  pathname: "/clubs/clubHome",
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
                  pathname: "/clubs/clubHome",
                  params: { id: post.author },
                });
              }
            }}
          >
            <Text>{ post.authorName }</Text>
            {/* potentially add class if role is student or alumni */}
            <Text>{post.authorType}</Text>  
          </TouchableOpacity>
        </View>

        <FontAwesome name="ellipsis-v" size={24} color="black" />
      </View>

      {/* actual post */}
      <Image
        source={{uri: post.content}}
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

        {/* Save */}
        <FontAwesome name="bookmark-o" size={24} color="black" />
      </View>

      {/* caption */}
      <Text className="mt-3">
        {post.caption}
      </Text>

      {/* View comments button */}

      <TouchableOpacity
        className="mt-3"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="font-semibold text-darkGray">View Comments</Text>
      </TouchableOpacity>

      {/* time */}
      <Text className="font-semibold mt-3">{formatDistance(postedAtDate, new Date(), { addSuffix: true })}</Text>

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

const PostContainer = ({ containerStyles, post }) => {
  return (
    <View className={containerStyles}>
      <PostContent post={post}/>
    </View>
  );
};

export default PostContainer;
