import { Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import { interestsData, currentClassesData, activitiesData } from "../../assets/data";
import CustomButton from "../CustomButton";
import { filterUsers } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const StudentFilter = ({ setUsers, dismissFilter }) => {
  const { orgId } = useGlobalContext();

  const [form, setForm] = useState({
    class: "",
    interests: [],
    group: "",
  });

  const handleApply = async () => {
    const users = await filterUsers("Student", form, orgId);
    console.log(users)
    setUsers(users);
    dismissFilter();
  };

  return (
    <>
      <View className="mt-3 mb-3 flex-row justify-center items-center">
        <Text className="text-3xl font-semibold text-center mr-2">Student</Text>
        <Ionicons name="filter-circle-outline" size={32} color="black" />
      </View>

      <View className="w-11/12 mx-auto mb-5">
        <SingleSelectDropdown
          data={currentClassesData}
          onItemSelect={(e) => {
            setForm({ ...form, class: e.value });
          }}
          focusedColor="#22c55e"
          title="Class"
          placeholder="Filter by Class"
        />
        <MultiSelectDropDown
          title="Interests"
          placeholder="Filter by Interests"
          data={interestsData}
          onItemSelect={(e) => {
            setForm({ ...form, interests: e });
          }}
        />
        <SingleSelectDropdown
          data={activitiesData}
          focusedColor="#22c55e"
          title="Group"
          placeholder="Filter By Group"
          onItemSelect={(e) => {
            setForm({ ...form, group: e.value });
          }}
        />
      </View>

      <CustomButton
        title="Apply"
        containerStyles="bg-primary py-3 w-4/12 mx-auto"
        textStyles="text-white font-semibold"
        handlePress={handleApply}
      />
    </>
  );
};

export default StudentFilter;
