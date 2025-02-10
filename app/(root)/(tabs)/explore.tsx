import SearchBar from "@/components/SearchBar";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="bg-white h-full px-5">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex justify-between gap-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <View className="flex-1 justify-center items-center mt-10">
              <ActivityIndicator size="large" color="#6D28D9" />
              <Text className="text-black-300 font-rubik mt-2">
                Loading properties...
              </Text>
            </View>
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="flex flex-col gap-6">
            {/* Header */}
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row items-center bg-gray-200 rounded-full p-2"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-2xl font-rubik-bold text-black-300">
                Explore Properties
              </Text>
              <TouchableOpacity className="flex flex-row items-center bg-gray-200 rounded-full p-2">
                <Image source={icons.bell} className="size-5" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <SearchBar />

            {/* Filters */}
            <View className="flex flex-col my-2 gap-5">
              <Filters />
              {/* Conditionally render the "Found X results" text */}
              {params.query && (
                <Text className="text-lg font-rubik-bold text-black-300">
                  Found {properties?.length} results for "{params.query}"
                </Text>
              )}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}