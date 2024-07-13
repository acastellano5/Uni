import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { isPostLiked, likePost, unlikePost } from '../../lib/useFirebase'; 

const LikeButton = ({ postId, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);

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
      setLikesCount(likesCount - 1);
    } else {
      await likePost(postId);
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLikeToggle}>
        {liked ? (
          <FontAwesome name="heart" size={24} color="red" />
        ) : (
          <FontAwesome name="heart-o" size={24} color="black" />
        )}
      </TouchableOpacity>
      <Text>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default LikeButton;
