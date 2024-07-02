import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Comment = ({ name, onRequestClose }) => {
  return (
    <View className="flex-row items-start mb-5">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onRequestClose();
          router.push({
            pathname: "/profile/profileShow",
            params: { uid: "a4a0c5a6-3c27-4d70-93c7-d0b53ccb6fb6" },
          });
        }}
      >
        <Image
          source={ProfilePic}
          style={styles.roundedBorders}
          className="mr-3"
        />
      </TouchableOpacity>

      <View className="justify-center">
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onRequestClose();
              router.push({
                pathname: "/profile/profileShow",
                params: { uid: "a4a0c5a6-3c27-4d70-93c7-d0b53ccb6fb6" },
              });
            }}
          >
            <Text className="font-semibold">{name}</Text>
          </TouchableOpacity>
          <Text className="text-sm ml-2 text-darkGray">2h</Text>
        </View>

        <Text>Awesome post!</Text>
      </View>
    </View>
  );
};

const CommentsSection = ({
  visible,
  onRequestClose,
  animationType,
  presentationStyle,
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      presentationStyle={presentationStyle}
    >
      <View style={styles.container}>
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

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View className="w-11/12 mx-auto pt-5">
            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />

            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />

            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />

            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />

            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />

            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />

            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />

            <Comment name="Jerry Smith" onRequestClose={onRequestClose} />
          </View>
        </ScrollView>
      </View>
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
  roundedBorders: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
