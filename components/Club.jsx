import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Club = ({img, name}) => {
  return (
    <View className="border border-tertiary rounded-md p-2 bg-white shadow items-center mb-3" style={styles.clubWidth}>
      <Image
        source={img}
        resizeMode='cover'
        className="h-[50] w-[50]"
      />
      <Text className="text-center text-xs" style={styles.redBackground}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    clubWidth: {
        width: '31%'
    }
  });

export default Club