import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createGroup } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router, useLocalSearchParams } from "expo-router";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import SingleSelect from "../../components/dropdown/SingleSelect";
import MultiSelect from "../../components/dropdown/MultiSelect";

const CreateGroup = () => {
  const { orgId } = useGlobalContext();
  const [showCategory, setShowCategory] = useState(false);
  const roles = [
    {
      value: "Student",
      label: "Student",
    },
    {
      value: "Alumni",
      label: "Alumni",
    },
    {
      value: "Faculty/Staff",
      label: "Faculty/Staff",
    },
    {
      value: "Parent",
      label: "Parent",
    },
  ];
  const [form, setForm] = useState({
    name: null,
    image: null,
    description: null,
    category: null,
    roles: null,
    type: null,
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  useEffect(() => {
    if (form.type === "School Group") {
      setShowCategory(true);
    } else {
      setForm({
        ...form,
        category: null,
      });
      setShowCategory(false);
    }
  }, [form.type]);

  const onCreatePress = async () => {
    if (
      form.name.trim() === "" ||
      form.image.trim() === "" ||
      form.description.trim() === "" ||
      form.roles.length === 0 ||
      form.type.trim() === ""
    ) {
      Alert.alert("Validation Error", "Please complete all required fields.");
      return;
    }

    if (form.type === "School Group" && form.category.trim() === "") {
      Alert.alert("Validation Error", "Please complete all required fields.");
      return;
    }

    const group = await createGroup(
      orgId,
      form.name,
      form.category,
      form.description,
      form.image,
      form.roles,
      form.type
    );
    console.log(group);
  };

  return (
    <SafeAreaView className="h-full bg-secondary">
      <BackHeader containerStyles="w-11/12 mx-auto" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pb-10">
        <ScrollView
          className="w-10/12 mx-auto top-[30]"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl mb-3 text-center font-semibold">
            Create Group
          </Text>

          <FormField
            title="Enter Name*"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mb-3"
            placeholder="Type here..."
            labelStyles="text-base"
            isEditable={true}
          />

          <SingleSelect
            title="Type*"
            placeholder="Select Type"
            containerStyles="mb-3"
            data={[
              { value: "School Group", label: "School Group" },
              { value: "Alumni Group", label: "Alumni Group" },
              { value: "Faculty Group", label: "Faculty Group" },
              { value: "Parent Group", label: "Parent Group" }
            ]}
            selectedValue={form.type} // Add this line
            onItemSelect={(item) => {
              setForm({
                ...form,
                type: item.value,
              });
            }}
          />

          {showCategory ? (
            <SingleSelect
              title="Category*"
              placeholder="Select Category"
              containerStyles="mb-3"
              data={[
                { value: "Athletic", label: "Athletic" },
                { value: "Academic", label: "Academic" },
                { value: "Art", label: "Art" },
              ]}
              selectedValue={form.category} // Add this line
              onItemSelect={(item) => {
                setForm({
                  ...form,
                  category: item.value,
                });
              }}
            />
          ) : null}

          <MultiSelect
            title="Who can view this group*"
            containerStyles="mb-3"
            onItemSelect={(e) => {
              setForm({ ...form, roles: e });
            }}
            placeholder="Select roles"
            data={roles}
          />

          <FormField
            title="Description*"
            placeholder="Max 300 characters"
            isEditable={true}
            isMultiLine={true}
            value={form.description}
            maxLength={300}
            otherStyles="mb-3"
            handleChangeText={(e) => {
              setForm({
                ...form,
                description: e,
              });
            }}
          />

          <ImageUpload title="Image Banner*" form={form} setForm={setForm} />

          <CustomButton
            title="Create"
            containerStyles="bg-primary py-3 mb-20"
            textStyles="text-white text-base font-semibold"
            handlePress={onCreatePress}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({});
