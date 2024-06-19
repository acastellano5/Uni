import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import CustomButton from "../../components/CustomButton";
import InfoBox from "../../components/profile/InfoBox";
import PostSection from "../../components/profile/PostSection";
import BackHeader from "../../components/BackHeader";
import Settings from "../../components/profile/settings/Settings";

const Profile = () => {

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  return (
    <SafeAreaView className="h-full bg-black">
      <BackHeader title="My Profile" containerStyles="w-11/12 mx-auto"/>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>

        {/* profile image with edit and settings buttons */}
          <View className="items-center justify-center">
            <Image
              source={ProfilePic}
              style={styles.profilePic}
              className="mb-2"
            />
            <Text className="text-lg font-medium">John Doe</Text>

            <View className="flex-row">
              <CustomButton
                title="Edit"
                textStyles="text-primary text-sm font-semibold"
              />

              <CustomButton
                title="Settings"
                containerStyles="ml-2"
                textStyles="text-darkGray text-sm font-semibold"
                handlePress={() => setIsSettingsVisible(true)}
              />
            </View>
          </View>



            {/* bio section */}
          <View className="bg-white w-11/12 mx-auto mt-5 px-3 py-2 rounded-lg mb-10">
            <Text className="text-lg font-medium mb-1">Bio</Text>
            <View className="bg-lightGreen mb-3 rounded-lg">
              <Text className="text-[#5e5e5e] p-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever.
              </Text>
            </View>

            {/* interests section */}
            <InfoBox title="Interests"/>

            {/* groups section */}
            <InfoBox title="Groups"/>

            {/* classes section */}
            <InfoBox title="Classes" />

            
            <PostSection/>


            <Settings
            visible={isSettingsVisible}
            onRequestClose={() => {setIsSettingsVisible(false)}}
            animationType="slide"
            presentationStyle="formSheet"
          />

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

export default Profile;
