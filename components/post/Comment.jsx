import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { router } from "expo-router";
import { formatDistanceToNowStrict } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { deleteComment } from "../../lib/useFirebase";

const Comment = ({ comment, onRequestClose, currentUserId, postId, onDelete }) => {
  const onDeleteComment= async () => {
    try {
      await deleteComment(postId, comment.commentId)
      onDelete()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View className="flex-row items-start mb-5">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onRequestClose();
          router.push({
            pathname: "/profile/profileShow",
            params: { uid: comment.authorId },
          });
        }}
      >
        <Image
          source={ProfilePic}
          style={styles.roundedBorders}
          className="mr-3"
        />
      </TouchableOpacity>

      <View>
        <View className="flex-row justify-between w-11/12">
          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onRequestClose();
                router.push({
                  pathname: "/profile/profileShow",
                  params: { uid: comment.authorId },
                });
              }}
            >
              <Text className="font-semibold">{comment.authorName}</Text>
            </TouchableOpacity>
            <Text className="text-sm ml-2 text-darkGray">
              {formatDistanceToNowStrict(new Date(comment.postedAt * 1000))}
            </Text>
          </View>

          {currentUserId === comment.authorId ? (
            <TouchableOpacity className="ml-5" onPress={onDeleteComment} activeOpacity={0.8}>
              <FontAwesome name="trash-o" size={24} color="red" />
            </TouchableOpacity>
          ) : null}
        </View>

        <Text>{comment.text}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  roundedBorders: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
