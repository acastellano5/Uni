import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackHeader from '../../components/BackHeader'

const index = () => {
  return (
    <SafeAreaView className="h-full bg-secondary">  
    <BackHeader containerStyles="w-11/12 mx-auto" />  
    <View className="bg-darkWhite mt-5 h-full rounded-t-3xl pt-5 pb-10">  
        
    </View>  
  </SafeAreaView>  
  )
}

export default index

const styles = StyleSheet.create({})