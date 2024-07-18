import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import FormField from "../FormField";
import SingleSelect from "../dropdown/SingleSelect";
import CustomButton from "../CustomButton"

const EditInfo = ({ group, groupInfo, setGroupInfo }) => {
  const groupTypes = [
    "Academic",
    "Faith, Justice, Wellness",
    "Athletic",
    "General",
  ];
  const formattedGroupTypes = groupTypes.map((type) => ({
    label: type,
    value: type,
  }));
  return (
    <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
      <FormField
        title="Banner"
        placeholder="Paste image url (for now)"
        value={groupInfo.image}
        isEditable={true}
        otherStyles="mb-2"
        handleChangeText={(e) => setGroupInfo({
            ...groupInfo, 
            image: e
        })}
      />

      <FormField
        title="Name"
        placeholder="Group Name"
        value={groupInfo.name}
        isEditable={true}
        otherStyles="mb-2"
        handleChangeText={(e) => setGroupInfo({
            ...groupInfo, 
            name: e
        })}
      />

      <SingleSelect
        title="Category"
        placeholder="Select Category"
        data={formattedGroupTypes}
        selectedValue={groupInfo.category}
        onItemSelect={(item) => {
            setGroupInfo({
                ...groupInfo, 
                category: item.value
            })
        }}
        containerStyles="mb-2"
      />

      <FormField
        title="Description"
        placeholder="Group Description"
        value={groupInfo.description}
        isEditable={true}
        isMultiLine={true}
        otherStyles="mb-2"
        handleChangeText={(e) => setGroupInfo({
            ...groupInfo, 
            description: e
        })}
      />

        <CustomButton containerStyles="mb-2 bg-primary py-2 mt-2 mb-20" textStyles="text-white text-base" title="Save"/>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({});
