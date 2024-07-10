import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Club = ({img, name, id}) => {
  return (
    <TouchableOpacity 
      className="border border-tertiary rounded-md p-2 bg-white shadow items-center m-1"
      style={styles.clubWidth} 
      // redirect to club home page
      onPress={() => {
        router.push({
          pathname: '/club',
          params: {name, id}
        })
      }}
    >

      {/* displays club icon */}
      <Image
        source={{ uri: "https://cdn0.iconfinder.com/data/icons/education-color-filled/5000/Education_icon_set_color-17-512.png" }}
        resizeMode='cover'
        className="h-[50] w-[50]"
      />

      {/* displays club name */}
      <Text className="text-center text-xs">{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    clubWidth: {
        width: '30%'
    }
  });

export default Club