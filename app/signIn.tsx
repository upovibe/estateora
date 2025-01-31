import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true); // Start loading
    try {
      const result = await login();
      if (result) {
        console.log("Login successful");
        // Navigate to another screen (e.g., home screen)
      } else {
        Alert.alert("Error", "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
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
            disabled={isLoading} // Disable button while loading
            className="bg-primary-300 px-8 py-3 rounded-full flex flex-row items-center justify-center gap-2 shadow-md shadow-blue-500"
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" /> // Show spinner while loading
            ) : (
              <>
                <Image source={icons.google} className="w-6 h-6" />
                <Text className="text-white font-rubik-medium text-lg">
                  Login with Google
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;