import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {Icons } from '../assets/icons/Icons'


const Tab = createBottomTabNavigator()

const TabBar=({Tabs}) => {
  return (
    <Tab.Navigator>
        {Tabs.map((item, index) => {
            return(
                <Tab.Screen name={item.route} component={item.component} />
            )
        })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})
export default TabBar