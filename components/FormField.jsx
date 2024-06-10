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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className={`text-base text-secondary ${labelStyles}`}>{title}</Text>

      <View className="w-full px-4 py-2 bg-black-100 rounded-lg border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
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