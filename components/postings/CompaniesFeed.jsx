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
import { getAllCompanies, deleteCompany } from "../../lib/useFirebase";
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
    setFilteredCompanies(companies);
  };

  const performSearchAndFilter = () => {
    const filtered = companies.filter((company) => {
      const matchesName = companyName
        ? company.companyName.toLowerCase().includes(companyName.toLowerCase())
        : true;
      const matchesLocation = location
        ? company.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesIndustry = selectedIndustry
        ? company.industry === selectedIndustry
        : true;
      return matchesName && matchesLocation && matchesIndustry;
    });
    setFilteredCompanies(filtered);
  };

  const handleInputClick = (field) => {
    setActiveSearchField(field);
    setModalVisible(true);
  };

  const renderCompany = useMemo(
    () =>
      ({ item }) =>
        <CompanyCard company={item} onDelete={(id) => handleCompanyDelete(id)} />,
    []
  );

  return (
    <>
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

          <TouchableOpacity
            style={{
              backgroundColor: "#063970",
              padding: 8,
              borderRadius: 5,
              marginRight: 3,
            }}
            activeOpacity={0.8}
            onPress={performSearchAndFilter}
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
            <MaterialCommunityIcons name="filter-variant" size={24} color="#063970" />
          </TouchableOpacity>
        </View>

        <Filter
          visible={isFilterVisible}
          onRequestClose={() => setIsFilterVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
          setSelectedIndustry={setSelectedIndustry}
        />

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
            No Companies match your search or filter criteria.
          </Text>
        )}
      </ScrollView>

      {/* Modal for Fullscreen Input */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TextInput
            style={{
              height: 50,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 18,
              width: "100%",
            }}
            placeholder={
              activeSearchField === "companyName"
                ? "Enter company name"
                : "Enter location"
            }
            value={activeSearchField === "companyName" ? companyName : location}
            onChangeText={(text) => {
              if (activeSearchField === "companyName") setCompanyName(text);
              else setLocation(text);
            }}
            autoFocus
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#063970",
                padding: 15,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#e6e6e6",
                padding: 15,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CompaniesFeed;
