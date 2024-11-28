import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Item = ({ name, title }) => {
  return (
    <View style={title !== "Groups" && title !== "Companies" ? styles.itemStyles : null}>
      <View className="bg-lightYellow rounded-lg py-3 flex-1 justify-center">
        <Text className="text-center">{name}</Text>
      </View>
    </View>
  );
};

const InfoBox = ({ title, info }) => {
  return (
    <View className="mb-3">
      <Text className="text-lg font-medium mb-1">{title}</Text>
      <View className="flex-row flex-wrap" style={{ alignItems: "stretch" }}>
        {info && info.length > 0 ? (
          title === "Groups" ? (
            info.map((item, index) => (
              <View style={styles.itemStyles} key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-lightYellow rounded-lg py-3 justify-center items-center"
                  onPress={() => {
                    router.push({
                      pathname: "/group",
                      params: { id: item.id },
                    });
                  }}
                >
                  <Text className="text-center">{item.name}</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : title === "Companies" ? (
            info.map((company, index) => (
              <View style={styles.itemStyles} key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-lightYellow rounded-lg p-3 justify-center items-center"
                  onPress={() => {
                    router.push({
                      pathname: "/postings/companyInfo",
                      params: { companyId: company.companyID },
                    });
                  }}
                >
                  <Text className="text-center">{company.companyName}</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            info.map((item, index) => <Item key={index} name={item} title={title} />)
          )
        ) : (
          <View style={styles.noInfoContainer}>
            <Text style={styles.noInfoText}>No information available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  itemStyles: {
    width: "33%",
    padding: 3,
  },
  noInfoContainer: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noInfoText: {
    fontSize: 16,
    color: "#888",
  },
});
