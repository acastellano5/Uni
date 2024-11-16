import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SingleSelect from "../../../components/dropdown/SingleSelect";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { classData, statesData, jobFieldsData } from "../../../assets/data";
import { sendAlumniRequest } from "../../../lib/useFirebase";
import SearchBar from "../../../components/SearchBar";

const AlumniForm = () => {
  const [collegeSearch, setCollegeSearch] = useState("");
  const [collegeResults, setCollegeResults] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [form, setForm] = useState({
    class: "",
    college: "",
    state: "",
    fieldOfEmployment: "",
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  const validateFields = () => {
    return (
      form.class && form.college && form.state && form.fieldOfEmployment
    );
  };

  const handleCollegeSearch = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=3S7pvEefde3OCErdbn6n0SSeq6dhpENh82L0AOR5&school.name=${collegeSearch}`
      );
      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        setIsLoading(false); // Stop loading on error
        return [];
      }

      const result = await response.json();
      const colleges = result.results.map((school) => ({
        id: school.id,
        name: school.school.name,
      }));
      setCollegeResults(colleges);
    } catch (error) {
      console.error("Error fetching college data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setForm({
      ...form,
      college: college.name,
    });
    setCollegeResults([]);
    setCollegeSearch("");
  };

  const handleFormSubmit = () => {
    if (!validateFields()) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    sendAlumniRequest(
      null,
      {
        class: form.class.label,
        state: form.state.label,
        fieldOfEmployment: form.fieldOfEmployment.label,
        college: form.college,
      },
      20030049
    ).then(() => router.push("./processReq"));
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="pl-9">
        <Text className="text-greenTheme text-4xl font-bold">Centro</Text>
      </View>

      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-10">
        <View className="w-10/12 mx-auto">
          <ScrollView showsVerticalScrollIndicator={false} className="h-full">
            <TouchableOpacity
              className="self-start"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text className="text-2xl font-semibold text-center mb-2">
              Salesianum School
            </Text>

            <SingleSelect
              title="Class"
              placeholder="Select class"
              data={classData}
              containerStyles="mb-2"
              selectedValue={form.class}
              onItemSelect={(item) => {
                setForm({ ...form, class: item.value });
              }}
            />

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
                setCollegeSearch("")
                setCollegeResults([])
              }}
              handleChangeText={setCollegeSearch}
            />

            {isLoading ? ( // Show loading spinner when loading
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

            {selectedCollege && (
              <Text className="text-black mb-2">
                Selected College: {selectedCollege.name}
              </Text>
            )}

            <SingleSelect
              title="State"
              placeholder="Select State"
              data={statesData}
              containerStyles="mb-2"
              selectedValue={form.state}
              onItemSelect={(item) => {
                setForm({ ...form, state: item.value });
              }}
            />
            <SingleSelect
              title="Field of employment"
              placeholder="Select field of employment"
              data={jobFieldsData}
              selectedValue={form.fieldOfEmployment}
              onItemSelect={(item) => {
                setForm({ ...form, fieldOfEmployment: item.value });
              }}
            />
            <CustomButton
              title="Join"
              containerStyles="bg-greenTheme py-2 mt-8"
              textStyles="text-white text-base"
              handlePress={handleFormSubmit}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AlumniForm;

const styles = StyleSheet.create({});
