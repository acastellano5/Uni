import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, image, imageStyles, isDisabled = false}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={`items-center justify-center rounded-lg  ${containerStyles} flex-row`}
        disabled={isDisabled}
    >
        <Image
          source={image}
          className={imageStyles}
        />
        <Text className={`${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton