import { StyleSheet, Text, View, Modal, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import { AntDesign } from '@expo/vector-icons';

const Comment = ({ name }) => {
  return (
    <View className="flex-row items-start mb-5">
      <Image
        source={ProfilePic}
        style={styles.roundedBorders}
        className="mr-3"
      />

      <View className="justify-center">
        <View className="flex-row items-center">
          <Text className="font-semibold">{name}</Text>
          <Text className="text-sm ml-2 text-darkGray">2h</Text>
        </View>

        <Text>skibbidi ohio rizzler</Text>
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
      <ScrollView showsVerticalScrollIndicator={false}>

      {/* close button */}
      <View className="w-11/12 mx-auto flex-row justify-end pt-5">
        <TouchableOpacity onPress={onRequestClose}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>




      <View>
        <Text className="text-2xl font-semibold text-center mb-5">
          Comments
        </Text>

        <View className="w-11/12 mx-auto">
          <Comment name="Nathan Reid" />

          <Comment name="Nathan Reid" />

          <Comment name="Nathan Reid" />

          <Comment name="Nathan Reid" />

          <Comment name="Nathan Reid" />
        </View>
      </View>
      </ScrollView>

    </Modal>
  );
};

export default CommentsSection;

const styles = StyleSheet.create({
  roundedBorders: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
