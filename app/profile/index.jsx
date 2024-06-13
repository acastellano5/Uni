import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, Link } from "expo-router";
import logo from "../../assets/images/logo.png";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import CustomButton from "../../components/CustomButton";

const index = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <View className="w-11/12 mx-auto flex-row justify-between items-center">
        {/* back button */}
        <TouchableOpacity
          className="bg-tertiary w-8 py-1 flex items-center rounded"
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-2xl text-white font-semibold">My Profile</Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Image source={logo} className="h-[4vh] w-[4vh]" />
        </TouchableOpacity>
      </View>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>

        <View className="items-center justify-center">
            <Image source={ProfilePic} style={styles.profilePic} className="mb-2"/>
            <Text className="text-lg font-medium">Nathan Reid</Text>

            <View className="flex-row">
                
                <CustomButton title="Edit" textStyles="text-primary text-sm font-semibold"/>

                <CustomButton title="Settings" containerStyles="ml-2" textStyles="text-darkGray text-sm font-semibold"/>
                
            </View>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});

export default index;
