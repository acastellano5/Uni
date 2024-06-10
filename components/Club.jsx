import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Club = ({img, name}) => {
  return (
    <TouchableOpacity 
      className="border border-tertiary rounded-md p-2 bg-white shadow items-center mb-3"
      style={styles.clubWidth} 
      // redirect to club home page
      onPress={() => {
        router.push({
          pathname: './clubs/clubHome',
          params: {name}
        })
      }}
    >

      {/* displays club icon */}
      <Image
        source={img}
        resizeMode='cover'
        className="h-[50] w-[50]"
      />

      {/* displays club name */}
      <Text className="text-center text-xs" style={styles.redBackground}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    clubWidth: {
        width: '31%'
    }
  });

export default Club