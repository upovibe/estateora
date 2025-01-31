import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { login } from "@/lib/appwrite";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleSignIn = async () => {
    console.log("Attempting to sign in...");
    try {
      const result = await login();
      
      if (result) {
        console.log("Login successful!");
        Alert.alert("Success", "You have successfully signed in!");
        refetch({}); // Refresh user state
      } else {
        console.log("Login failed!");
        Alert.alert("Error", "Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Onboarding Image */}
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        {/* Welcome Section */}
        <View className="flex flex-col items-center justify-center w-full gap-4">
          {/* Welcome Text */}
          <Text className="font-rubik uppercase text-black-200 text-lg font-bold">
            Welcome to
          </Text>

          {/* Estateora Text with Rotation */}
          <View className="relative">
            <Text className="text-5xl font-rubik-bold text-primary-300 transform rotate-[-3deg] text-center">
              Estateora
            </Text>

            {/* Curved Double Underline */}
            <View className="absolute bottom-[-8px] left-0 right-0 flex items-center justify-center">
              <View className="w-4/5 h-[2px] bg-primary-300 transform rotate-[-3deg] rounded-full" />
            </View>
            <View className="absolute bottom-[-12px] left-0 right-0 flex items-center justify-center">
              <View className="w-4/5 h-[2px] bg-primary-300 transform rotate-[-3deg] rounded-full" />
            </View>
          </View>

          {/* Subheading */}
          <Text className="text-gray-600 text-2xl font-rubik-medium text-black-300 text-center capitalize w-10/12 mt-4">
            Let's get you closer to your ideal home.
          </Text>
        </View>

        {/* Sign In Button */}
        <View className="flex items-center justify-center w-full gap-2 mt-8">
          <TouchableOpacity
            onPress={handleSignIn}
            className="bg-primary-300 px-8 py-3 rounded-full flex flex-row items-center justify-center gap-2 shadow-md shadow-blue-500"
          >
            <Image source={icons.google} className="w-6 h-6" />
            <Text className="text-white font-rubik-medium text-lg">
              Login with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
