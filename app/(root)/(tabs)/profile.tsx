import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

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
      <Text
        style={textStyle}
        className="text-lg font-rubik-medium text-black-300"
      >
        {title}
      </Text>
      {showArrow && (
        <Image source={icons.rightArrow} className="ml-auto size-6" />
      )}
    </View>
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch({});
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <TouchableOpacity className="flex flex-row items-center bg-gray-200 rounded-full p-2">
            <Image source={icons.bell} className="size-5" />
          </TouchableOpacity>
        </View>

        <View className="flex flex-col gap-14 mt-5">
          {/* Profile Picture & Edit */}
          <View className="flex-row justify-center">
            <View className="flex flex-col items-center relative">
              <Image
                source={{ uri: user?.avatar }}
                className="size-44 relative rounded-full"
              />
              <TouchableOpacity className="absolute bottom-11 right-14">
                <Image source={icons.edit} className="size-9" />
              </TouchableOpacity>
              <Text className="text-2xl font-rubik-bold mt-2 capitalize text-center">
                {user?.name}
              </Text>
            </View>
          </View>

          <View className="flex flex-col gap-5">
            {/* Settings */}
            <View className="flex flex-col align-items-center px-3 rounded-xl bg-gray-200">
              <SettingsItem
                icon={icons.calendar}
                title="My Booking"
                showArrow
                onPress={() => {}}
              />
              <SettingsItem
                icon={icons.wallet}
                title="My Wallet"
                showArrow
                onPress={() => {}}
              />
            </View>

            {/* Additional Settings */}
            <View className="flex flex-col align-items-center px-3 rounded-xl bg-gray-200">
              {settings.slice(2).map((item, index) => (
                <SettingsItem
                  key={index}
                  {...item}
                  onPress={() => {}}
                  showArrow
                />
              ))}
            </View>

            <View className="flex flex-col align-items-center px-3 rounded-xl bg-gray-200">
              <SettingsItem
                icon={icons.logout}
                title="Logout"
                onPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
