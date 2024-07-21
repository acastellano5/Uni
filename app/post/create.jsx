import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";  
import React, { useState, useEffect } from "react";  
import { SafeAreaView } from "react-native-safe-area-context";  
import { Ionicons } from "@expo/vector-icons";  
import BackHeader from "../../components/BackHeader";  
import FormField from "../../components/FormField";  
import CustomButton from "../../components/CustomButton";  
import * as ImagePicker from "expo-image-picker";  
import {  
  createUserPost,  
  createGroupPost,  
  uploadToFirebase,  
} from "../../lib/useFirebase";  
import { useGlobalContext } from "../../context/globalProvider";  
import { router, useLocalSearchParams } from "expo-router";  
  
const CreatePost = () => {  
  const { orgId } = useGlobalContext();  
  const { authorType, groupId } = useLocalSearchParams();  
  const [image, setImage] = useState(null);  
  const [form, setForm] = useState({  
    caption: "pool day",  
    postUrl:  
      "https://leisurepoolsusa.com/wp-content/uploads/2020/06/best-type-of-swimming-pool-for-my-home_2.jpg",  
  });  
  
  useEffect(() => {  
    console.log(image);  
  }, [image]);  
  
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
      setImage(result.assets[0].uri);  
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
      setImage(result.assets[0].uri);  
    }  
  };  
  
  return (  
    <SafeAreaView className="h-full bg-secondary">  
      <BackHeader containerStyles="w-11/12 mx-auto" />  
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">  
        <View className="w-10/12 mx-auto top-[50]">  
          <Text className="text-3xl text-center font-semibold">Create Post</Text>  
  
          <FormField  
            title="Caption"  
            value={form.caption}  
            handleChangeText={(e) => setForm({ ...form, caption: e })}  
            otherStyles="mb-5"  
            placeholder="Caption..."  
            labelStyles="text-base font-medium"  
            isEditable={true}  
          />  
  
  
          <Text className="text-base font-medium mb-2">Image (optional)</Text>  
          <View style={styles.buttonContainer}>  
            <TouchableOpacity style={styles.button} onPress={pickImage} className="border border-primary" activeOpacity={0.8}>  
              <Ionicons name="image-outline" size={24} color="#22c55e" />  
              <Text style={styles.buttonText} className="text-primary">Pick an Image</Text>  
            </TouchableOpacity>  
  
            <TouchableOpacity style={styles.button} onPress={takePhoto} className="border border-primary" activeOpacity={0.8}>  
              <Ionicons name="camera-outline" size={24} color="#22c55e" />  
              <Text style={styles.buttonText} className="text-primary">Take a Photo</Text>  
            </TouchableOpacity>  
          </View>  
  
          {image && <Image source={{ uri: image }} style={styles.image} />}  
  
          <CustomButton  
            title="Create"  
            containerStyles="bg-primary py-3"  
            textStyles="text-white text-base font-semibold"  
            handlePress={async () => {  
              if (authorType === "group") {  
                createGroupPost(groupId, form.postUrl, form.caption, orgId);  
              } else if (authorType === "user") {  
                if (image) {  
                  const task = await uploadToFirebase(image);  
                  createUserPost(task, form.caption, orgId);  
                } else {  
                  createUserPost(form.postUrl, form.caption, orgId);  
                }  
              }  
              router.push("/home");  
            }}  
          />  
        </View>  
      </View>  
    </SafeAreaView>  
  );  
};  
  
export default CreatePost;  
  
const styles = StyleSheet.create({  
  buttonContainer: {  
    flexDirection: "row",  
    justifyContent: "space-around",  
    marginBottom: 15,  
  },  
  button: {  
    flexDirection: "row",  
    alignItems: "center",  
    paddingVertical: 10,  
    paddingHorizontal: 20,  
    borderRadius: 8,  
  },  
  buttonText: {  
    marginLeft: 10,  
  },  
  image: {  
    width: 200,  
    height: 200,  
    alignSelf: "center",  
    marginBottom: 15,  
  }  
});  
