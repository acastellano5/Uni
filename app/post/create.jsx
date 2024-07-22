import { StyleSheet, Text, View, Alert } from "react-native";  
import React, { useState } from "react";  
import { SafeAreaView } from "react-native-safe-area-context";  
import BackHeader from "../../components/BackHeader";  
import FormField from "../../components/FormField";  
import CustomButton from "../../components/CustomButton";  
import {  
  createUserPost,  
  createGroupPost,  
  uploadToFirebase,
} from "../../lib/useFirebase";  
import { useGlobalContext } from "../../context/globalProvider";  
import { router, useLocalSearchParams } from "expo-router";  
import ImageUpload from "../../components/imageUpload/ImageUpload";
  
const CreatePost = () => {  
  const { orgId } = useGlobalContext();  
  const { authorType, groupId } = useLocalSearchParams();  
  const [form, setForm] = useState({  
    text: "",  
    image: "",  
  });    

  const onCreatePress = async () => {  
    if (form.text.trim() === "") {  
      Alert.alert("Validation Error", "You must provide text for the post.");  
      return;  
    }  
    if (authorType === "group") {  
      createGroupPost(groupId, form.image, form.text, orgId);  
    } else if (authorType === "user") {  
      if (form.image) {  
        const task = await uploadToFirebase(form.image);  
        createUserPost(task, form.text, orgId);  
      } else {  
        createUserPost(form.image, form.text, orgId);  
      }  
    }  
    router.push("/home");  
  }
  
  return (  
    <SafeAreaView className="h-full bg-secondary">  
      <BackHeader containerStyles="w-11/12 mx-auto" />  
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">  
        <View className="w-10/12 mx-auto top-[50]">  
          <Text className="text-3xl text-center font-semibold">Create Post</Text>  
  
          <FormField  
            title="Text"  
            value={form.text}  
            handleChangeText={(e) => setForm({ ...form, text: e })}  
            otherStyles="mb-5"  
            placeholder="Type here..."  
            labelStyles="text-base"  
            isEditable={true}  
          />  
  
          <ImageUpload title="Image" form={form} setForm={setForm}/>
         
  
          <CustomButton  
            title="Create"  
            containerStyles="bg-primary py-3"  
            textStyles="text-white text-base font-semibold"  
            handlePress={onCreatePress}  
          />  
        </View>  
      </View>  
    </SafeAreaView>  
  );  
};  
  
export default CreatePost;  
  
const styles = StyleSheet.create({});  
