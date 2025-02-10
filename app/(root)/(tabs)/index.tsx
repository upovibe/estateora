import SearchBar from "@/components/SearchBar";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Cards";
import { FeaturedCard } from "@/components/FeaturedCard";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });
  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    // SafeAreaView ensures content does not overlap with device notches/status bar
    <SafeAreaView className="bg-white h-full px-5">
      {/* <Button title="Seed" onPress={seed} /> */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id} // Fixed: Use item.$id
        numColumns={2}
        contentContainerClassName="pb-32 "
        columnWrapperClassName="flex justify-between"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header Section */}
            <View className="flex flex-row items-center justify-between my-5">
              {/* User Profile Section */}
              <View className="flex flex-row items-center gap-2">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start">
                  <Text className="text-sm font-rubik text-black/50">
                    Good Morning
                  </Text>
                  <Text className="text-base text-gray-900 font-rubik-medium capitalize">
                    {user?.name}
                  </Text>
                </View>
              </View>

              {/* Notification Icon */}
              <TouchableOpacity className="flex flex-row items-center bg-gray-200 rounded-full p-2">
                <Image source={icons.bell} className="size-5" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <SearchBar />

            {/* Featured Section */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={latestProperties}
              renderItem={({ item }) => (
                <FeaturedCard
                  item={item}
                  onPress={() => handleCardPress(item.$id)}
                />
              )}
              keyExtractor={(item) => item.$id} // Fixed: Use item.$id
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerClassName="flex gap-5 "
            />

            {/* recommended Section */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black">
                  Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Filters */}
              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}