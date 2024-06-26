import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Header'
import {ListItem, Avatar} from 'react-native-elements';
import database from '@react-native-firebase/database';
import ChatList from '../../../components/messaging/ChatList';
import TabsDisplay from "../../../components/TabsDisplay";

const tabs = ["DM", "Groups", "Classes", "Alerts"];


export default function Messages() {
  const [search, setsearch] = useState('')
  const [allUser, setAllUser] = useState([])
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const displayTabContent = () => {
    switch (activeTab) {
      case "DM":
        return <ChatList filter={activeTab}/>;

      case "Groups":
        return <ChatList filter={activeTab}/>;
      
      case "Classes":
        return <ChatList filter={activeTab}/>;
      
      case "Alerts":
        return <ChatList filter={activeTab}/>
      default:
        return null;
    }
  };
  return (
    <SafeAreaView className="h-full bg-secondary">
      <Header title="Home" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
      <TabsDisplay
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          containerStyles="py-3"
          textStyles="text-base"
          tabBarStyles="w-10/12"
        />
        
        {displayTabContent()}

      
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
