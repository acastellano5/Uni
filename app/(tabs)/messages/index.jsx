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
import ChatTabs from '../../../components/messaging/ChatTabs';

const tabs = ["DMs", "Groups", "Classes", "Alerts"];


export default function Messages() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <SafeAreaView className="h-full bg-primary">
      <Header title="Home" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">
        <ChatTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <ChatList filter={activeTab}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});