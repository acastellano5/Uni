import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import schoolImage from "../../assets/images/school.png";
import Comments from "./CommentsSection";
import { router } from "expo-router";

const PostContent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              router.push({
                pathname: "/profile/profileShow",
                params: { uid: "c41be759-c7e3-4cc2-9751-1fe80f63bb24" },
              });
            }}
          >
            <FontAwesome name="user-circle" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="ml-5"
            activeOpacity={0.8}
            onPress={() => {
              router.push({
                pathname: "/profile/profileShow",
                params: { uid: "c41be759-c7e3-4cc2-9751-1fe80f63bb24" },
              });
            }}
          >
            <Text>Derek Jeter</Text>
            <Text>Class of 2024</Text>
          </TouchableOpacity>
        </View>

        <FontAwesome name="ellipsis-v" size={24} color="black" />
      </View>

      {/* actual post */}
      <Image
        source={schoolImage}
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
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever.
      </Text>

      {/* View comments button */}

      <TouchableOpacity
        className="mt-3"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="font-semibold text-darkGray">View Comments</Text>
      </TouchableOpacity>

      {/* time */}
      <Text className="font-semibold mt-3">45 minutes ago</Text>

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

const PostContainer = ({ containerStyles }) => {
  return (
    <View className={containerStyles}>
      <PostContent />
    </View>
  );
};

export default PostContainer;
