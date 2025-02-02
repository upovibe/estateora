import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow,
}: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <View className="flex flex-row items-center py-4">
      <Image source={icon} className="size-6 mr-3" />
      <Text style={textStyle} className="text-lg font-rubik-medium text-black-300">
        {title}
      </Text>
      {showArrow && <Image source={icons.rightArrow} className="ml-auto size-6" />}
    </View>
  </TouchableOpacity>
);

const Profile = () => {
  const handleLogout = () => {};

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* Profile Picture & Edit */}
        <View className="flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image source={images.avatar} className="size-44 relative rounded-full" />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9 rounded-full" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">User Profile</Text>
          </View>
        </View>

        {/* Settings */}
        <View className="flex flex-col mt-10 border-b pb-5 border-gray-200">
          <SettingsItem icon={icons.calendar} title="My Booking" showArrow onPress={() => {}} />
          <SettingsItem icon={icons.wallet} title="My Wallet" showArrow onPress={() => {}} />
        </View>

        {/* Additional Settings */}
        <View className="flex flex-col mt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} onPress={() => {}} showArrow/>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
