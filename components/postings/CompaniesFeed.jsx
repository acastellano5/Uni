import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { router } from "expo-router";
import SearchBar from "../SearchBar";
import Filter from "../../components/postings/CompanyFilter"
import { getAllCompanies } from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/globalProvider";

const CompanyCard = ({ company }) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-lg p-3 mb-3 w-11/12 mx-auto d-flex flex-row items-center"
      activeOpacity={0.8}
      onPress={() => router.push("/postings/companyInfo")}
    >
      <Image
        source={{
          uri: company.logo,
        }}
        style={{ width: 100, height: 100, borderRadius: 50, objectFit: 'cover' }}
        className="mr-3"
      />

      <View>
        <Text className="text-lg font-bold">{ company.companyName }</Text>
        <Text className="mb-3">{company.location}</Text>

        <TouchableOpacity
          className="bg-primary py-1 px-3 rounded-lg"
          style={{ alignSelf: "flex-start" }}
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation();
            router.push("/postings/companyInfo");
          }}
        >
          <Text className="text-white">See More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const CompaniesFeed = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Controls filter modal visibility
  const { orgId } = useGlobalContext()

  const [ companies, setCompanies ] = useState([])
  const [ companiesLoading, setCompaniesLoading ] = useState(true)

  const fetchCompanies = async () => {
    const fetchedCompanies = await getAllCompanies(orgId)
    const alumniCompanies = fetchedCompanies.filter(company => company.isAlumniOwned)
    setCompanies(alumniCompanies)
  }

  useEffect(() => {
    fetchCompanies()
    setCompaniesLoading(false)
  }, [ ])

  const clearSearch = () => {
    setSearchValue("");
  };

  const performSearch = () => {
    alert("search performed");
  };

  const renderCompany = useMemo(() => ({ item }) => (
    <CompanyCard company={item}/>
  ))

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
      { companiesLoading ? (
        <ActivityIndicator size="large" color="#063970"/>
      ) : companies.length > 0 ? (
        <FlatList
          data={companies}
          renderItem={renderCompany}
        />
      ) : (
        <Text className="text-center text-darkGray text-base mt-10">No Companies yet.</Text>
      ) }
    </ScrollView>
  );
};

export default CompaniesFeed;
