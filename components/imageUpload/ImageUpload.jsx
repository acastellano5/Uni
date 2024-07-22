import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";  
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({ title, form, setForm }) => {

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
            image: result.assets[0].uri
          })
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
            image: result.assets[0].uri
          })
        }
      };

  return (
    <>
      <Text className="text-base mb-2">{ title }</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={pickImage}
          className="border border-primary"
          activeOpacity={0.8}
        >
          <Ionicons name="image-outline" size={24} color="#22c55e" />
          <Text style={styles.buttonText} className="text-primary">
            Pick an Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={takePhoto}
          className="border border-primary"
          activeOpacity={0.8}
        >
          <Ionicons name="camera-outline" size={24} color="#22c55e" />
          <Text style={styles.buttonText} className="text-primary">
            Take a Photo
          </Text>
        </TouchableOpacity>
      </View>

      {form.image && <Image source={{ uri: form.image }} style={styles.image} />}
    </>
  );
};

export default ImageUpload;

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
