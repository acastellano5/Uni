import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import React from "react";
import CustomButton from "../CustomButton";
import FormField from "../FormField";
import MultiSelect from "../dropdown/MultiSelect";
import { interestsData } from "../../assets/data";
import { setAccountBio } from "../../lib/firebase"; 
const Interests = ({ handleNextPress, handleSkipPress }) => {
  const [form, setForm] = useState({
    bio: null,
    interests: [null],

  });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Page title */}
      <Text className="text-4xl font-semibold text-center mb-5">
        Bio & Interests
      </Text>

      {/* Form Inputs */}
      <FormField
        title="Bio"
        value={form.bio}
        handleChangeText={(e) => setForm({ ...form, bio: e })}
        placeholder="Type here"
        isEditable={true}
        isMultiLine={true}
        maxLength={300}
        otherStyles="mb-3"
      />

      <MultiSelect title="Interests" placeholder="Select interest(s)"
       data={interestsData} 
        value={form.interests}
        handleChangeText={(e) => setForm({ ...form, interests: e })}
        onItemSelect={(e) => {
          setForm({ ...form, interests: e });
        }}/>

      {/* Next and Skip Buttons */}
      <View className="flex-row justify-center mt-10">
        <CustomButton
          title="Skip"
          containerStyles="bg-tertiary py-2 px-8"
          textStyles="text-base"
          handlePress={handleSkipPress}
        />

        <CustomButton
          title="Next"
          containerStyles="bg-primary py-2 px-8 ml-3"
          textStyles="text-base"
          handlePress={()=>setAccountBio(form.bio,form.interests).then(handleNextPress)}
        />
      </View>
    </ScrollView>
  );
};

export default Interests;

const styles = StyleSheet.create({});
