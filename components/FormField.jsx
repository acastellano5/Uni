import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import eyeIcon from "../assets/icons/eye.png"
import eyeHideIcon from "../assets/icons/eye-hide.png"

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  labelStyles,
  isEditable,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className={`text-base text-secondary ${labelStyles}`}>{title}</Text>

      <View className={`w-full px-4 py-2 bg-black-100 rounded-lg border border-black-200 focus:border-secondary flex flex-row items-center ${!isEditable ? 'bg-darkWhite' : null} `}>
        <TextInput
          className={`flex-1 font-psemibold text-base ${!isEditable ? "text-[#AFAFAF]" : null}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          editable={isEditable}
          secureTextEntry={(title === "Password" || title === "Current Password" || title === "New Password") && !showPassword}
          {...props}
        />

        {(title === "Password" || title === "Current Password" || title === "New Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? eyeIcon : eyeHideIcon}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;