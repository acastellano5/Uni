import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { router } from "expo-router";
import Filter from "../../components/postings/CompanyFilter";
import { getAllCompanies, deleteCompany } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from '@expo/vector-icons/AntDesign';

const CompanyCard = ({ company, onDelete }) => {
  const { user } = useGlobalContext();

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the company "${company.companyName}"?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteCompany(company.companyID);
              onDelete(company.companyID); // Notify parent component of deletion
            } catch (error) {
              console.error("Error deleting company:", error);
            }
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({
      pathname: "/postings/editCompany",
      params: { companyId: company.companyID },
    });
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-lg p-3 mb-3 w-11/12 mx-auto d-flex flex-row items-center"
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/postings/companyInfo",
          params: { companyId: company.companyID },
        })
      }
    >
      <Image
        source={{
          uri: company.logo,
        }}
        style={{ width: 80, height: 80, borderRadius: 40, objectFit: "cover" }}
        className="mr-3"
      />

      <View className="d-flex flex-row flex-1 justify-between">
        <View>
          <Text className="text-lg font-bold">{company.companyName}</Text>
          <Text className="mb-3">{company.location}</Text>

          <TouchableOpacity
            className="bg-primary py-1 px-3 rounded-lg"
            style={{ alignSelf: "flex-start" }}
            activeOpacity={0.8}
            onPress={(e) => {
              e.stopPropagation();
              router.push({
                pathname: "/postings/companyInfo",
                params: { companyId: company.companyID },
              });
            }}
          >
            <Text className="text-white">See More</Text>
          </TouchableOpacity>
        </View>

        {user.uid === company.owner ? (
          <View className="flex-row items-start">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleEdit}
              className="mr-3"
            >
              <Feather name="edit" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
              <FontAwesome name="trash-o" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const CompaniesFeed = () => {
  const [jobTitle, setJobTitle] = useState(""); // For searching by job title
  const [location, setLocation] = useState(""); // For searching by location
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Controls filter modal visibility
  const { orgId } = useGlobalContext();

  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCompanies = async () => {
    const fetchedCompanies = await getAllCompanies(orgId);
    const alumniCompanies = fetchedCompanies.filter(
      (company) => company.isAlumniOwned
    );
    setCompanies(alumniCompanies);
    setFilteredCompanies(alumniCompanies); // Initially show all companies
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCompanies();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCompanies();
    setCompaniesLoading(false);
  }, []);

  const clearSearch = () => {
    setJobTitle("");
    setLocation("");
    setFilteredCompanies(companies); // Reset to show all companies
  };

  const performSearch = () => {
    const filtered = companies.filter((company) => {
      const matchesTitle = jobTitle
        ? company.companyName.toLowerCase().includes(jobTitle.toLowerCase())
        : true;
      const matchesLocation = location
        ? company.location.toLowerCase().includes(location.toLowerCase())
        : true;
      return matchesTitle && matchesLocation;
    });
    setFilteredCompanies(filtered);
  };

  const handleCompanyDelete = (deletedCompanyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.companyID !== deletedCompanyId)
    );
    setFilteredCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.companyID !== deletedCompanyId)
    );
  };

  const renderCompany = useMemo(
    () =>
      ({ item }) =>
        <CompanyCard company={item} onDelete={handleCompanyDelete} />,
    []
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#063970"]} tintColor={"#063970"} />
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
        className="w-11/12 mx-auto"
      >
        {/* Job Title Input */}
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "#ccc",
            fontSize: 12.5,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          placeholder="Search by company name"
          value={jobTitle}
          onChangeText={setJobTitle}
        />
        {/* Location Input */}
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "#ccc",
            fontSize: 12.5,
            borderWidth: 1,
            borderRadius: 5,
            marginRight: 5,
            paddingHorizontal: 10,
          }}
          placeholder="Search by location"
          value={location}
          onChangeText={setLocation}
        />
        {/* Search Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#063970",
            padding: 8,
            borderRadius: 5,
            marginRight: 3,
          }}
          activeOpacity={0.8}
          onPress={performSearch}
        >
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
        {/* Clear Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e6e6e6",
            padding: 8,
            borderRadius: 5,
          }}
          activeOpacity={0.8}
          onPress={clearSearch}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Filter
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
        setUsers={() => {
          console.log("Filter applied");
        }}
      />

      {/* Render company cards */}
      {companiesLoading ? (
        <ActivityIndicator size="large" color="#063970" />
      ) : filteredCompanies.length > 0 ? (
        <FlatList
          data={filteredCompanies}
          renderItem={renderCompany}
          keyExtractor={(item) => item.companyID}
        />
      ) : (
        <Text className="text-center text-darkGray text-base mt-10">
          No Companies match your search.
        </Text>
      )}
    </ScrollView>
  );
};

export default CompaniesFeed;
