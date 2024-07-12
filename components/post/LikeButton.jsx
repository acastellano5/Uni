import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { likePost, unlikePost } from "../../lib/useFirebase";

const LikeButton = ({ isPostLiked, setIsPostLiked, postLikes, post }) => {
    const [ numLikes, setNumLikes ] = useState(postLikes)

  return (
    <View className="flex-row items-center">
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
        if (isPostLiked) {
            unlikePost(post.postId)
            setNumLikes(numLikes - 1)
            setIsPostLiked(false)
        } else {
            likePost(post.postId)
            setNumLikes(numLikes + 1)
            setIsPostLiked(true)
        }
      }}>
        {isPostLiked ? (
            <FontAwesome name="heart" size={24} color="black" />
        ) : (
            <FontAwesome name="heart-o" size={24} color="black" />
        )}
      </TouchableOpacity>
      <Text className="text-base ml-2">{numLikes}</Text>
    </View>
  );
};

export default LikeButton;

const styles = StyleSheet.create({});
