import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { signOut } from "../../../lib/firebase";
import { getUserRole } from "../../../lib/useFirebase";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/globalProvider";

const SettingsBtn = ({ title, containerStyles, handlePress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex-row justify-between items-center ${containerStyles}`}
      onPress={handlePress}
    >
      <Text className="text-base font-medium">{title}</Text>
      <AntDesign name="arrowright" size={24} color="#545454" />
    </TouchableOpacity>
  );
};

const ActionBtn = ({ title, onPress, textColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="self-start mt-3"
      activeOpacity={0.8}
    >
      <Text className={`text-base font-medium ${textColor}`}>{title}</Text>
    </TouchableOpacity>
  );
};

const Main = ({ onRequestClose, setScreen }) => {
  const { orgId } = useGlobalContext();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    getUserRole(orgId).then((result) => setUserRole(result));
  }, []);
  return (
    <>
      <View style={styles.header}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={onRequestClose}>
            <AntDesign name="close" size={24} color="#545454" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        className="w-10/12 mx-auto"
      >
        {/* settings options */}
        <SettingsBtn
          title="Change Password"
          containerStyles="mt-3"
          handlePress={() => setScreen("changePW")}
        />

        {userRole && userRole === "Student" ? (
          <SettingsBtn
            title="Add Parent"
            containerStyles="mt-3"
            handlePress={() => setScreen("addParent")}
          />
        ) : null}

        <ActionBtn
          title="Sign Out"
          textColor="text-darkGray"
          onPress={() => {
            signOut().then(router.back("//index"));
          }}
        />
        <ActionBtn
          title="Delete Account"
          onPress={() => setScreen("deleteAccount")}
          textColor="text-red-500"
        />
      </ScrollView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: 15,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingTop: 100, // Adjust this value based on the header height
  },
});
