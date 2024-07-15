import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import ProfilePic from "../../assets/images/profilepic.jpeg";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import MultiSelect from "../../components/dropdown/MultiSelect";
import { useLocalSearchParams, router } from "expo-router";
import { useGlobalContext } from "../../context/globalProvider";
import { interestsData } from "../../assets/data";
import { editProfile } from "../../lib/useFirebase";

const EditProfile = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();
  const params = useLocalSearchParams();
  let user = params;
  if (user.interests === "") {
    user.interests = [];
  } else {
    user.interests = user.interests.split(",");
  }

  // set interests state
  const [interests, setInterests] = useState(user.interests);
  useEffect(() => {
    setInterests(user.interests);
  }, []);

  // set form state
  const [form, setForm] = useState({
    fullName: user.fullName,
    bio: user.bio,
    interests,
  });

  useEffect(() => {
    const formattedInterests = interests.map((interest) =>
      interest
        .replace(/_/g, " ")
        .split(" ")
        .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
        .join(" ")
    );
    setForm({
      ...form,
      interests: formattedInterests,
    });
  }, [interests]);

  const onSavePress = async () => {
    const { fullName, bio, interests } = form
    await editProfile(fullName, bio, interests)
    router.dismiss()
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-10/12 mx-auto"
        >
          {/* Edit profile heading */}
          <Text className="text-3xl font-semibold text-center mb-3">
            Edit Profile
          </Text>

          {/* change photo */}
          <View className="items-center">
            <Image
              source={ProfilePic}
              style={styles.profilePic}
              className="mb-3"
            />
            <CustomButton title="Change Photo" textStyles={"text-yellow-500"} />
          </View>

          {/* edit name */}
          <FormField
            title="Full Name"
            placeholder="Full Name"
            value={form.fullName}
            isEditable={true}
            otherStyles={"mb-3"}
            handleChangeText={(e) => {
              setForm({
                ...form,
                fullName: e,
              });
            }}
          />

          {/* interests */}
          <MultiSelect
            title="Interests"
            placeholder="Select interest(s)"
            data={interestsData}
            defaultSelected={interests}
            setList={setInterests}
          />

          {/* bio */}
          <FormField
            title="Bio"
            placeholder="Type here"
            isEditable={true}
            isMultiLine={true}
            value={form.bio}
            maxLength={300}
            otherStyles="mb-5"
            handleChangeText={(e) => {
              setForm({
                ...form,
                bio: e,
              });
            }}
          />

          {/* Save button */}
          <CustomButton
            title="Save"
            containerStyles="bg-primary p-2 mb-20"
            textStyles="text-base text-white"
            handlePress={onSavePress}
          />
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

export default EditProfile;
