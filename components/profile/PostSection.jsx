import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import pongImage from "../../assets/images/pingpongbg.png"
import { router } from "expo-router";

const PostImage = () => {
  return (
    <TouchableOpacity className="w-1/4 h-[9vh] p-1" activeOpacity={0.8} onPress={() => router.push('/post')}>
      <Image 
        source={pongImage}
        className="w-full h-full rounded-sm"
        // style={styles.imageStyles}
      />
    </TouchableOpacity>
  );
};

const PostSection = () => {
  return (
    <View>
      <Text className="text-lg font-medium mb-1">Posts</Text>
      <View className="flex-row flex-wrap">
        <PostImage/>
        <PostImage/>
        <PostImage/>
        <PostImage/>
        <PostImage/>
        <PostImage/>
      </View>
    </View>
  );
};

export default PostSection;

const styles = StyleSheet.create({
    imageStyles: {
        width: '25%',
        height: '5vh',
        objectFit: 'cover'
    }
});
