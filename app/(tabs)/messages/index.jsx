import React, { useEffect, useState } from 'react';
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

const data = [
  { 
    title:"Iced Espresso", 
    description:"Goo",
    avatar: "https://avatars.githubusercontent.com/u/97818313?s=48&v=4"
  },
  {
    title:"Decaf",
    description:"its new!",
    avatar: "https://i.ytimg.com/vi/0gvOF5_e34I/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBY4RQr5IjPj21J5gKh1IrQY6o2Sw"
  }
 ]; 

const Item = ({ title, description, avatar }) => (
  <ListItem>
    <Avatar
    source={{uri: ({avatar})}}
    rounded
    title={title}
    size='medium'
    />
    <ListItem.Content>
    <ListItem.Title>
      {title}
    </ListItem.Title>
    <ListItem.Subtitle>
      {description}
    </ListItem.Subtitle>
    </ListItem.Content>
    
  </ListItem>
);
const renderItem = ({ item }) => (
  <Item title={item.title} description={item.description} avatar={item.avatar}/>
);
export default function Messages() {
  const [search, setsearch] = useState('')
  const [allUser, setAllUser] = useState([])
  useEffect(()=> {
    getAllUser();

  }, []);
  const getAllUser = () => {

  }
  return (
    <SafeAreaView className="h-full bg-secondary">
      <Header title="Home" />
      <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-3">

      {data && (
      <FlatList

        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}

      />
    )}
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
