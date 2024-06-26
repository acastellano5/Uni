import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({handlePress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} className="self-start mb-3" onPress={handlePress}>
        <Ionicons name="arrow-back" size={24} color="#545454" />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({})