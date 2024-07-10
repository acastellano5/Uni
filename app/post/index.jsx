import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from '../../components/BackHeader';
import Post from '../../components/post/Post';
import { useLocalSearchParams } from "expo-router";

const ShowPost = () => {
  // retrieve params from request
  const params = useLocalSearchParams();
  const post = params


  return (
    <SafeAreaView className="h-full bg-darkWhite">
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="w-11/12 mx-auto">
                <BackHeader containerStyles="mb-10"/>
                <Post post={post}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ShowPost

const styles = StyleSheet.create({})