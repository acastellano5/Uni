import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SingleSelectDropdown from "../dropdown/SingleSelect";
import MultiSelectDropDown from "../dropdown/MultiSelect";
import {
  interestsData,
  classData,
  statesData,
  jobFieldsData,
} from "../../assets/data";
import CustomButton from "../CustomButton";
import { filterUsers, getAllGroups } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import SearchBar from "../../components/SearchBar";

const AlumniFilter = ({ setUsers, dismissFilter }) => {
  const { orgId } = useGlobalContext(); // Get organization ID from global context

  // State variables
  const [collegeSearch, setCollegeSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [collegeResults, setCollegeResults] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for groups data
  const [isLoading, setIsLoading] = useState(false); // Loading state for college search
  const [form, setForm] = useState({
    class: "",
    interests: [],
    state: "",
    field: "",
    college: "",
    group: "",
  });

  useEffect(() => {
    console.log(form)
  }, [ form ])

  // Fetch groups data on component mount
  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const groups = await getAllGroups(orgId, "Alumni");
        setGroupsData(
          groups.map((group) => ({
            label: group.name,
            value: group.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching groups data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupsData();
  }, [orgId]);

  // Handle form submission to apply filters
  const handleApply = async () => {
    try {
      const users = await filterUsers("Alumni", form, orgId);
      setUsers(users);
      dismissFilter();
    } catch (error) {
      console.error("Error filtering users:", error);
    }
  };

  // Search colleges using an external API
  const handleCollegeSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=3S7pvEefde3OCErdbn6n0SSeq6dhpENh82L0AOR5&school.name=${collegeSearch}`
      );
      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const result = await response.json();
      setCollegeResults(
        result.results.map((school) => ({
          id: school.id,
          name: school.school.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching college data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle college selection from search results
  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setForm((prevForm) => ({ ...prevForm, college: college.name }));
    setCollegeResults([]);
    setCollegeSearch("");
  };

  return (
    <>
      {!loading && (
        <>
          {/* Header */}
          <View className="mt-3 mb-3 flex-row justify-center items-center">
            <Text className="text-3xl font-semibold text-center mr-2">
              Alumni
            </Text>
            <Ionicons name="filter-circle-outline" size={32} color="black" />
          </View>

          {/* Filter Options */}
          <View className="w-11/12 mx-auto mb-5">
            {/* Dropdowns for filtering */}
            <SingleSelectDropdown
              data={classData}
              onItemSelect={(e) => setForm({ ...form, class: e.value })}
              containerStyles="mb-2"
              title="Class"
              placeholder="Filter by Class"
            />
            <MultiSelectDropDown
              title="Interests"
              containerStyles="mb-2"
              onItemSelect={(e) => setForm({ ...form, interests: e })}
              placeholder="Filter by Interests"
              data={interestsData}
            />
            <SingleSelectDropdown
              data={groupsData}
              title="Groups"
              containerStyles="mb-2"
              placeholder="Filter by Groups"
              onItemSelect={(e) => setForm({ ...form, group: e.value })}
            />
            <SingleSelectDropdown
              data={statesData}
              containerStyles="mb-2"
              onItemSelect={(e) => setForm({ ...form, state: e.value })}
              title="State"
              placeholder="Filter by State"
            />
            <SingleSelectDropdown
              data={jobFieldsData}
              containerStyles="mb-2"
              onItemSelect={(e) => setForm({ ...form, field: e.value })}
              title="Field"
              placeholder="Filter by Field"
            />

            {/* College Search */}
            <Text className="mb-1 text-base">College</Text>
            <SearchBar
              containerStyles="w-full bg-transparent mb-2"
              fieldStyles="bg-transparent border-black"
              iconColor="#000"
              placeholder="Search College"
              placeholderColor="#7B7B8B"
              placeholderStyles="text-base"
              handleSubmitEditing={handleCollegeSearch}
              textValue={collegeSearch}
              onClearSearch={() => {
                setCollegeSearch("");
                setCollegeResults([]);
              }}
              handleChangeText={setCollegeSearch}
            />

            {/* College Results or Loading Indicator */}
            {isLoading ? (
              <ActivityIndicator size="large" color="#00ff00" className="mb-2" />
            ) : (
              collegeResults.length > 0 && (
                <FlatList
                  data={collegeResults}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleCollegeSelect(item)}
                      className="p-2 border-b border-gray-200"
                    >
                      <Text className="text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  className="bg-white mb-2"
                />
              )
            )}

            {/* Selected College */}
            {selectedCollege && (
              <Text className="text-black mb-2">
                Selected College: {selectedCollege.name}
              </Text>
            )}
          </View>

          {/* Apply Button */}
          <CustomButton
            title="Apply"
            containerStyles="bg-primary py-3 w-4/12 mx-auto"
            textStyles="text-white font-semibold"
            handlePress={handleApply}
          />
        </>
      )}
    </>
  );
};

export default AlumniFilter;
