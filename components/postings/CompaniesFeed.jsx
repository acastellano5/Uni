import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import SearchBar from "../SearchBar";
import Filter from "../../components/postings/CompanyFilter"

const CompanyCard = () => {
  return (
    <TouchableOpacity
      className="bg-white rounded-lg p-3 mb-3 w-11/12 mx-auto d-flex flex-row items-center"
      activeOpacity={0.8}
      onPress={() => router.push("/postings/companyInfo")}
    >
      <Image
        source={{
          uri: "https://thumbs.dreamstime.com/b/meta-logo-facebook-rebrand-concept-icon-blue-color-social-media-new-name-text-kyiv-ukraine-october-233509975.jpg",
        }}
        style={{ width: 100, height: 100 }}
      />

      <View>
        <Text className="text-lg font-bold">Meta</Text>
        <Text className="mb-3">San Francisco, CA</Text>

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

  const clearSearch = () => {
    setSearchValue("");
  };

  const performSearch = () => {
    alert("search performed");
  };

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
      <CompanyCard />
      <CompanyCard />
    </ScrollView>
  );
};

export default CompaniesFeed;
