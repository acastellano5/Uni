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
  Modal,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { router } from "expo-router";
import Filter from "../../components/postings/CompanyFilter";
import { getAllCompanies, deleteCompany, getCompanyByIndustry, getCompanyByName } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSearchField, setActiveSearchField] = useState(""); // Tracks the active input field
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
    setFilteredCompanies(alumniCompanies);
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
    setCompanyName("");
    setLocation("");
    setSelectedIndustry(null);
    fetchCompanies();
  };

  const handleInputClick = (field) => {
    setActiveSearchField(field);
    setModalVisible(true);
  };

  const fetchFilteredCompanies = async () => {
    const companies = await getCompanyByIndustry(orgId, selectedIndustry);
    setCompanies(companies);
  };

  const performSearch = async () => {
    setSelectedIndustry(null);
    const companies = await getCompanyByName(orgId, companyName);
    setCompanies(companies);
  };

  useEffect(() => {
    if (selectedIndustry) {
      setCompanyName("");
      fetchFilteredCompanies();
    }
  }, [selectedIndustry]);

  const handleCompanyDelete = async (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.companyID !== companyId)
    );
    setFilteredCompanies((prevFiltered) =>
      prevFiltered.filter((company) => company.companyID !== companyId)
    );
  };

  const renderCompany = ({ item }) => (
    <CompanyCard company={item} onDelete={handleCompanyDelete} />
  );

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#063970"]}
            tintColor={"#063970"}
          />
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
          {/* Search Inputs */}
          <TouchableOpacity
            style={{
              flex: 1,
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
              marginRight: 5,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
            onPress={() => handleInputClick("companyName")}
          >
            <Text style={{ color: companyName ? "black" : "#ccc" }}>
              {companyName || "Search by company name"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
              marginRight: 5,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
            onPress={() => handleInputClick("location")}
          >
            <Text style={{ color: location ? "black" : "#ccc" }}>
              {location || "Search by location"}
            </Text>
          </TouchableOpacity>

          {/* Search and Clear Buttons */}
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

          <TouchableOpacity
            style={{
              backgroundColor: "#e6e6e6",
              padding: 8,
              borderRadius: 5,
              marginRight: 3,
            }}
            activeOpacity={0.8}
            onPress={clearSearch}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#e6e6e6",
              padding: 8,
              borderRadius: 5,
            }}
            activeOpacity={0.8}
            onPress={() => setIsFilterVisible(true)}
          >
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#063970"
            />
          </TouchableOpacity>
        </View>

        {/* Render Selected Industry Filter */}
        {selectedIndustry && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginLeft: 15,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
            }}
          >
            <Text style={{ marginRight: 10, color: "#063970", fontSize: 16 }}>
              {selectedIndustry}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedIndustry(null);
                fetchCompanies();
              }}
              style={{
                width: 20,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e6e6e6",
                borderRadius: 10,
              }}
            >
              <AntDesign name="close" size={14} color="black" />
            </TouchableOpacity>
          </View>
        )}

        <Filter
          visible={isFilterVisible}
          onRequestClose={() => setIsFilterVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
          setSelectedIndustry={setSelectedIndustry}
        />

        {companiesLoading ? (
          <ActivityIndicator size="large" color="#063970" />
        ) : companies.length > 0 ? (
          <FlatList
            data={filteredCompanies}
            renderItem={renderCompany}
            keyExtractor={(item) => item.companyID}
          />
        ) : (
          <Text className="text-center text-darkGray text-base mt-10">
            No Companies found.
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default CompaniesFeed;
