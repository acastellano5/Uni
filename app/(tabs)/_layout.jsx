import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import Icons from "../../assets/icons/Icons";
import {Home, Social, Clubs, Events} from './index';


import Colors from "../../assets/Colors";
import TabBar from "../../components/TabBar";
const TabArr = [
    { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: Home, color: Colors.primary, alphaClr: Colors.primaryAlpha },
    { route: 'Clubs', label: 'Search', type: Icons.Feather, icon: 'search', component: Clubs, color: Colors.green, alphaClr: Colors.greenAlpha },
    { route: 'Social', label: 'Add New', type: Icons.Feather, icon: 'plus-square', component: Events, color: Colors.red, alphaClr: Colors.redAlpha },
    { route: 'Events', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: Social, color: Colors.purple, alphaClr: Colors.purpleAlpha },
  ];
  
  const MainLayout= () => {
    return (
     <TabBar
     Tabs={TabArr} />
    )
  }
  
  const styles = StyleSheet.create({})

export default MainLayout