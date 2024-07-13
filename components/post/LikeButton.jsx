import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { isPostLiked, likePost, unlikePost } from '../../lib/useFirebase'; 

const LikeButton = ({ postId, likeCount, setLikeCount }) => {
  const [liked, setLiked] = useState(false);
  // const [likesCount, setLikesCount] = useState(initialLikes || 0);

  useEffect(() => {
    const checkIfLiked = async () => {
      const response = await isPostLiked(postId);
      setLiked(response);
    };

    checkIfLiked();
  }, [postId]);

  const handleLikeToggle = async () => {
    if (liked) {
      await unlikePost(postId);
      setLikeCount(likeCount - 1);
    } else {
      await likePost(postId);
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <View className="flex-row items-center justify-center">
      <TouchableOpacity onPress={handleLikeToggle}>
        {liked ? (
          <FontAwesome name="heart" size={24} color="red" />
        ) : (
          <FontAwesome name="heart-o" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default LikeButton;
