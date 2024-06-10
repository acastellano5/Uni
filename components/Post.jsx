import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import schoolImage from "../assets/images/school.png";

const Post = () => {
  return (
    <View className="w-10/12 mx-auto mb-10">
      {/* User info */}
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <FontAwesome name="user-circle" size={30} color="black" />

          <View className="ml-5">
            <Text>Andrew Castellano</Text>
            <Text>Class of 2024</Text>
          </View>
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
            <FontAwesome name="commenting-o" size={24} color="black" />
            <Text className="text-base ml-2">234</Text>
          </View>
        </View>


        {/* Save */}
        <FontAwesome name="bookmark-o" size={24} color="black" />
      </View>



      {/* caption */}
      <Text className="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</Text>


      {/* time */}
      <Text className="font-semibold mt-3">45 minutes ago</Text>
    </View>
  );
};

export default Post;
