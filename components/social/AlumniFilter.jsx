import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import {
  interestsData,
  classData,
  collegesData,
  statesData,
  jobFieldsData,
} from "../../assets/data";
import CustomButton from "../CustomButton";
import { filterUsers } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";
const AlumniFilter = ({ setUsers, dismissFilter }) => {
  const { orgId } = useGlobalContext();

  const [form, setForm] = useState({
    class: "",
    interests: [],
    state: "",
    field: "",
    college: "",
  });

  const handleApply = async () => {
    const users = await filterUsers("Alumni", form, orgId);
    setUsers(users)
    dismissFilter();
  };
  return (
    <>
      <View className="mt-3 mb-3 flex-row justify-center items-center">
        <Text className="text-3xl font-semibold text-center mr-2">Alumni</Text>
        <Ionicons name="filter-circle-outline" size={32} color="black" />
      </View>

      <View className="w-11/12 mx-auto mb-5">
        <SingleSelectDropdown
          data={classData}
          onItemSelect={(e) => {
            setForm({ ...form, class: e.value });
          }}
          focusedColor="#22c55e"
          title="Class"
          placeholder="Filter by Class"
        />
        <MultiSelectDropDown
          title="Interests"
          onItemSelect={(e) => {
            setForm({ ...form, interests: e });
          }}
          placeholder="Filter by Interests"
          data={interestsData}
        />
        <SingleSelectDropdown
          data={statesData}
          onItemSelect={(e) => setForm({ ...form, state: e.value })}
          focusedColor="#22c55e"
          title="State"
          placeholder="Filter by State"
        />
        <SingleSelectDropdown
          data={jobFieldsData}
          onItemSelect={(e) => setForm({ ...form, field: e.value })}
          focusedColor="#22c55e"
          title="Field"
          placeholder="Filter by Field"
        />
        <SingleSelectDropdown
          data={collegesData}
          onItemSelect={(e) => setForm({ ...form, college: e.value })}
          focusedColor="#22c55e"
          title="College"
          placeholder="Filter by College"
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

export default AlumniFilter;
