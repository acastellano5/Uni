import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { AntDesign } from "@expo/vector-icons";
import Comment from "./Comment";
import {
  createComment,
  getUserAttributes,
  getComments,
} from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const CommentsSection = ({
  visible,
  onRequestClose,
  animationType,
  presentationStyle,
  post,
  currentUserId,
}) => {
  const { orgId } = useGlobalContext();
  const [commentText, setCommentText] = useState("");
  const [loadedComments, setLoadedComments] = useState([]);

  const fetchComments = async () => {
    const comments = await getComments(post.postId, orgId);
    let commentsArr = [];
    for (let key in comments) {
      let comment = {};
      if (comments.hasOwnProperty(key)) {
        comment.commentId = key;
        comment.authorId = comments[key].author;
        comment.postedAt = comments[key].postedAt.seconds; // Store as number
        comment.text = comments[key].text;
      }
      commentsArr.push(comment);
    }
    const commentsWithAuthors = await fetchCommentsAuthor(commentsArr);
    // Sort comments by postedAt in descending order
    commentsWithAuthors.sort((a, b) => b.postedAt - a.postedAt);
    setLoadedComments(commentsWithAuthors);
  };

  useEffect(() => {
    if (visible) {
      fetchComments();
    }
  }, [visible]);

  const fetchCommentsAuthor = async (comments) => {
    return await Promise.all(
      comments.map(async (comment) => {
        const author = await getUserAttributes(comment.authorId);
        return {
          ...comment,
          authorName: author.fullName,
        };
      })
    );
  };

  const handleSendComment = async () => {
    if (commentText.trim() === "") {
      Alert.alert("Validation Error", "You must provide text to comment.");
      return;
    } else {
      await createComment(post.postId, commentText);
      setCommentText("");
      Keyboard.dismiss();
      fetchComments();
    }
  };

  const commentsList = useMemo(
    () =>
      loadedComments.length > 0 ? (
        loadedComments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            onRequestClose={onRequestClose}
            currentUserId={currentUserId}
            postId={post.postId}
            onDelete={fetchComments}
          />
        ))
      ) : (
        <Text className="text-center text-base">No Comments</Text>
      ),
    [loadedComments, onRequestClose]
  );

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      presentationStyle={presentationStyle}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50} // Adjust this offset based on your needs
      >
        {/* comments header */}
        <View style={styles.header}>
          {/* close button */}
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onRequestClose}>
              <AntDesign name="close" size={24} color="#545454" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>Comments</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps={"always"}
          keyboardDismissMode="on-drag"
        >
          <View className="w-11/12 mx-auto pt-5">
            {visible ? commentsList : null}
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={commentText}
            onChangeText={setCommentText}
            onSubmitEditing={handleSendComment}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendComment}
          >
            <Text style={styles.sendButtonText} className="text-green-500">
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: 15,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingTop: 80, // Adjust this value based on the header height
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonText: {
    fontWeight: "bold",
  },
});
