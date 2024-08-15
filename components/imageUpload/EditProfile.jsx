import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ProfileUpload = ({ form, setForm, containerStyles }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({
        ...form,
        profilePicture: result.assets[0].uri,
      });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({
        ...form,
        profilePicture: result.assets[0].uri,
      });
    }
  };

  return (
    <View className={`${containerStyles} flex-row right-1 mb-3`}>
      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
        className="border border-primary p-1 px-2"
        activeOpacity={0.8}
      >
        <Ionicons name="image-outline" size={24} color="#063970"/>
        <Text className="text-primary ml-1">
          Pick an Image
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={takePhoto}
        className="border border-primary p-1 px-2 ml-3"
        activeOpacity={0.8}
      >
        <Ionicons name="camera-outline" size={24} color="#063970"/>
        <Text className="text-primary ml-1">
          Take a Photo
        </Text>
      </TouchableOpacity>

      {/* {form.image && (
        <Image source={{ uri: form.image }} style={styles.image} />
      )} */}
    </View>
  );
};

export default ProfileUpload;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
//   buttonText: {
//     marginLeft: 10,
//   },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 15,
  },
});
