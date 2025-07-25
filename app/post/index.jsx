import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from '../../components/BackHeader';
import Post from '../../components/post/Post';
import { router, useLocalSearchParams } from "expo-router";

const ShowPost = () => {
  // retrieve params from request
  const params = useLocalSearchParams();
  let post = params

  // set likes of post from params
  if (post.likes === "") {
    post.likes = []
  } else {
    post.likes = post.likes.split(/[,\s]+/)
  }
  
  // set comments of post from params
  if (post.comments === "") {
    post.comments = []
  } else {
    post.comments = post.comments.split(/[,\s]+/)
  }

  return (
    <SafeAreaView className="h-full bg-darkWhite">
        <ScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          keyboardDismissMode="on-drag"
        >
            <View className="w-11/12 mx-auto">
                <BackHeader containerStyles="mb-10"/>
                <Post post={post} onDelete={() => {
                  router.dismiss()
                  }}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ShowPost

const styles = StyleSheet.create({})