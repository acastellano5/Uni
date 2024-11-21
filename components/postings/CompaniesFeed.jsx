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
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { router } from "expo-router";
import SearchBar from "../SearchBar";
import Filter from "../../components/postings/CompanyFilter";
import { getAllCompanies, deleteCompany } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

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
  const [searchValue, setSearchValue] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Controls filter modal visibility
  const { orgId } = useGlobalContext();

  const [companies, setCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCompanies = async () => {
    const fetchedCompanies = await getAllCompanies(orgId);
    const alumniCompanies = fetchedCompanies.filter(
      (company) => company.isAlumniOwned
    );
    setCompanies(alumniCompanies);
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
    setSearchValue("");
  };

  const performSearch = () => {
    alert("search performed");
  };

  const handleCompanyDelete = (deletedCompanyId) => {
    setCompanies((prevCompanies) =>
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#063970"]} tintColor={"#063970"}/>
      }
    >
      <SearchBar
        placeholder="Search by location"
        filterOnPress={() => setIsFilterVisible(true)}
        textValue={searchValue}
        onClearSearch={clearSearch}
        handleChangeText={setSearchValue}
        handleSubmitEditing={performSearch}
        onValidateSearch={() => setSearchValue("")}
        needFilter={true}
        containerStyles="mb-3"
      />

      <Filter
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
        animationType="slide"
        presentationStyle="formSheet"
        setUsers={() => {
          console.log("yurr");
        }}
      />

      {/* render company cards */}
      {companiesLoading ? (
        <ActivityIndicator size="large" color="#063970" />
      ) : companies.length > 0 ? (
        <FlatList
          data={companies}
          renderItem={renderCompany}
          keyExtractor={(item) => item.companyID}
        />
      ) : (
        <Text className="text-center text-darkGray text-base mt-10">
          No Companies yet.
        </Text>
      )}
    </ScrollView>
  );
};

export default CompaniesFeed;
