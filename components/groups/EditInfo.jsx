import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import FormField from "../FormField";
import SingleSelect from "../dropdown/SingleSelect";
import CustomButton from "../CustomButton"
import { editGroup } from "../../lib/useFirebase";
import ImageUpload from "../imageUpload/ImageUpload";

const EditInfo = ({ group, groupInfo, setGroupInfo, fetchGroup}) => {
  const groupTypes = [
    "Academic",
    "Faith, Justice, Wellness",
    "Athletic",
    "General",
    "Alumni",
    "Parent",
  ];
  const formattedGroupTypes = groupTypes.map((type) => ({
    label: type,
    value: type,
  }));

  useEffect(() => {
    console.log(groupInfo)
  }, [ groupInfo ])

  const onSavePress = async () => {
    await editGroup(group,groupInfo)
    console.log("EXACTLY");

    fetchGroup()
    console.log("EXACTLY");

  }
  return (
    <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
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

      <ImageUpload title="Group Banner" form={groupInfo} setForm={setGroupInfo}/>

        <CustomButton containerStyles="bg-primary py-2 mt-2 mb-[200px]" textStyles="text-white text-base" handlePress={onSavePress} title="Save"/>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({});
