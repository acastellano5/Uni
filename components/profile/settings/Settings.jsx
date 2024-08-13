import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainSettings from "./Main";
import ChangePW from "./ChangePW";
import UpdateEmail from "./UpdateEmail"
import DeleteAccount from "./DeleteAcccount";
import AddParent from "./AddParent";

const Settings = ({
  visible,
  onRequestClose,
  animationType,
  presentationStyle,
}) => {
  const [screen, setScreen] = useState("main");

  useEffect(() => {
    if (visible) {
      setScreen("main")
    }
  }, [visible]);


  const renderScreen = () => {
    switch (screen) {
      case "main":
        return <MainSettings onRequestClose={onRequestClose} setScreen={setScreen}/>;

      case "changePW": 
        return <ChangePW setScreen={setScreen}/>

      case "deleteAccount": 
        return <DeleteAccount setScreen={setScreen}/>

      case "addParent": 
        return <AddParent setScreen={setScreen} />

      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      presentationStyle={presentationStyle}
    >
      <SafeAreaView>{renderScreen()}</SafeAreaView>
    </Modal>
  );
};

export default Settings;

const styles = StyleSheet.create({});
