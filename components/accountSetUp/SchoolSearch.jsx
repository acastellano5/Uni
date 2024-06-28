import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

const School = () => {
  return (
    <View className="flex-row items-center bg-white rounded-lg p-3 mb-3">
      <Image
        source={{
          uri: "https://agency-m.com/sites/default/files/Salesianum-port01-square-1.png",
        }}
        style={styles.schoolPicture}
      />

      <View className="ml-5 items-start">
        <Text className="text-base font-semibold">Salesianum School</Text>
        <Text className="font-medium text-darkGray mb-2">Wilmington, DE</Text>
        <TouchableOpacity className="bg-primary py-1 px-3 rounded-sm" activeOpacity={0.8}>
          <Text className="text-white">Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SchoolSearch = () => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full mb-10">
        {/* eventually will need to dynamically give margin top to school components */}
        <School />
        <School />
        <School />
        <School />
      </ScrollView>
    </>
  );
};

export default SchoolSearch;

const styles = StyleSheet.create({
  schoolPicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
