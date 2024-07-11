import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Group = ({img, name, id}) => {
  return (
    <TouchableOpacity 
      className="border border-tertiary rounded-md p-2 bg-white shadow items-center m-1"
      style={styles.groupWidth} 
      // redirect to group home page
      onPress={() => {
        router.push({
          pathname: '/group',
          params: {name, id}
        })
      }}
    >

      {/* displays group icon */}
      <Image
        source={{ uri: "https://cdn0.iconfinder.com/data/icons/education-color-filled/5000/Education_icon_set_color-17-512.png" }}
        resizeMode='cover'
        className="h-[50] w-[50]"
      />

      {/* displays group name */}
      <Text className="text-center text-xs">{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    groupWidth: {
        width: '30%'
    }
  });

export default Group