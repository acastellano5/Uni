import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import MultiSelect from "../../components/dropdown/MultiSelect";
import SingleSelectDropdown from "../../components/dropdown/SingleSelect";
import { useLocalSearchParams, router } from "expo-router";
import { useGlobalContext } from "../../context/globalProvider";
import { interestsData } from "../../assets/data";
import { editProfile } from "../../lib/useFirebase";
import EditProfileUpload from "../../components/imageUpload/EditProfile";
import { getUserAttributes, getUserRole } from "../../lib/useFirebase";
import { jobFieldsData, collegesData, classData, statesData } from "../../assets/data";

const EditProfile = () => {
  // getting orgId from global context
  const { orgId } = useGlobalContext();
  const { uid } = useLocalSearchParams();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState();
  const [role, setRole] = useState();
  const [user, setUser] = useState();

  // if (user.interests === "") {
  //   user.interests = [];
  // } else {
  //   user.interests = user.interests.split(",");
  // }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userDoc = await getUserAttributes(uid);
      const roleInfo = await getUserRole(orgId);
      setRole(roleInfo);
      setUser(userDoc);
      setInterests(userDoc.interests);
      console.log(userDoc);
      setForm({
        fullName: userDoc.fullName,
        bio: userDoc.bio,
        profilePicture: userDoc.profilePicture,
        interests: userDoc.interests,
      });

      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);

  useEffect(() => {
    if (form.fullName) {
      setForm({
        ...form,
        interests,
      });
    }
  }, [interests]);

  const onSavePress = async () => {
    const { fullName, bio, interests, profilePicture } = form;
    if (fullName.trim() === "") {
      Alert.alert("Validation Error", "You must provide your full name.");
      return;
    }
    await editProfile(fullName, bio, interests, profilePicture);
    router.dismiss();
  };

  const displayFields = () => {
    switch (role) {
      case "Student":
        alert("student");
        break;

      case "Alumni":
        return (
          <>
            <SingleSelectDropdown
              data={statesData}
              containerStyles="mb-3"
              onItemSelect={(e) => setForm({ ...form, state: e.value })}
              title="State"
              selectedValue={user.orgs[20030049].state}
              placeholder="Select State"
            />
            <SingleSelectDropdown
              data={jobFieldsData}
              containerStyles="mb-3"
              onItemSelect={(e) => setForm({ ...form, field: e.value })}
              title="Field"
              selectedValue={user.orgs[20030049].field}
              placeholder="Select Field"
            />
            <SingleSelectDropdown
              data={collegesData}
              containerStyles="mb-3"
              onItemSelect={(e) => setForm({ ...form, college: e.value })}
              title="College"
              selectedValue={user.orgs[20030049].college}
              placeholder="Select College"
              isSearchable={true}
            />
            <SingleSelectDropdown
              data={classData}
              containerStyles="mb-5"
              onItemSelect={(e) => setForm({ ...form, class: e.value })}
              title="Class"
              selectedValue={user.orgs[20030049].class}
              placeholder="Select Class"
            />
          </>
        );

      case "Faculty/Staff":
        alert("Faculty/Staff");
        break;

      case "Parent":
        alert("Parent");
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <BackHeader containerStyles="w-11/12 mx-auto" title="Salesianum" />

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">
        {loading ? (
          <ActivityIndicator size="large" color="#063970" />
        ) : (
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
                source={{ uri: form.profilePicture }}
                style={styles.profilePic}
                className="mb-3"
              />
              <EditProfileUpload
                form={form}
                setForm={setForm}
                containerStyles="w-10/12 mx-auto"
              />
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
              onItemSelect={setInterests}
              containerStyles={"mb-3"}
            />

            {/* bio */}
            <FormField
              title="Bio"
              placeholder="Max 300 characters"
              isEditable={true}
              isMultiLine={true}
              value={form.bio}
              maxLength={300}
              otherStyles="mb-3"
              handleChangeText={(e) => {
                setForm({
                  ...form,
                  bio: e,
                });
              }}
            />

            {displayFields()}

            {/* Save button */}
            <CustomButton
              title="Save"
              containerStyles="bg-primary p-2 mb-20"
              textStyles="text-base text-white"
              handlePress={onSavePress}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 90,
    width: 90,
    borderRadius: 45,
    objectFit: "cover",
  },
});

export default EditProfile;
