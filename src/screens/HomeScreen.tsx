import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from "reanimated-masonry-list";
import { BlurView } from "expo-blur";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
import { TabsStackScreenProps } from "../navigators/TabsNavigator";

const CATEGORIES = [
  "Clothing",
  "Shoes",
  "Accessories",
  "Accessories 2",
  "Accessories 3",
  "Accessories 4",
];

const AVATAR_URL =
  "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const MESONARY_LIST_DATA = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
    title: "PUMA Everyday Hussle",
    price: 160,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80",
    title: "PUMA Everyday Hussle",
    price: 200,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 120,
  },
];

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header Section */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Image
            source={{
              uri: AVATAR_URL,
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
                color: colors.text,
              }}
              numberOfLines={1}
            >
              Hi, James 👋
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={1}
            >
              Discover fashion that suit your style
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Icons name="notifications" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar Section */}
        <View style={{ flexDirection: "row", paddingHorizontal: 24, gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              paddingHorizontal: 24,
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Icons
              name="search"
              size={24}
              color={colors.text}
              style={{ opacity: 0.5 }}
            />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: colors.text,
                opacity: 0.5,
              }}
            >
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              backgroundColor: colors.primary,
            }}
          >
            <Icons name="tune" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Grid Collection View */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              New Collections
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", height: 200, gap: 12 }}>
            <Card
              onPress={() => {
                navigation.navigate("Details", {
                  id: "123",
                });
              }}
              price={130}
              imageUrl="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            />
            <View style={{ flex: 1, gap: 12 }}>
              <Card
                onPress={() => {
                  navigation.navigate("Details", {
                    id: "456",
                  });
                }}
                price={120}
                imageUrl="https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              />
              <Card
                onPress={() => {
                  navigation.navigate("Details", {
                    id: "789",
                  });
                }}
                price={170}
                imageUrl="https://images.unsplash.com/photo-1485218126466-34e6392ec754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
              />
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Mesonary */}
        <MasonryList
          data={MESONARY_LIST_DATA}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: any) => (
            <View style={{ padding: 6 }}>
              <View
                style={{
                  aspectRatio: i === 0 ? 1 : 2 / 3,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 24,
                }}
              >
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode="cover"
                  style={StyleSheet.absoluteFill}
                />
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      padding: 12,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#fff",
                        textShadowColor: "rgba(0,0,0,0.2)",
                        textShadowOffset: {
                          height: 1,
                          width: 0,
                        },
                        textShadowRadius: 4,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: 100,
                        height: 32,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icons
                        name="favorite-border"
                        size={20}
                        color={colors.text}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }} />
                  <BlurView
                    style={{
                      flexDirection: "row",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      alignItems: "center",
                      padding: 6,
                      borderRadius: 100,
                      overflow: "hidden",
                    }}
                    intensity={20}
                  >
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#fff",
                        marginLeft: 8,
                      }}
                      numberOfLines={1}
                    >
                      ${item.price}
                    </Text>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 100,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Icons name="add-shopping-cart" size={18} color="#000" />
                    </TouchableOpacity>
                  </BlurView>
                </View>
              </View>
            </View>
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>

      <BottomSheetModal
        snapPoints={["85%"]}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <FilterView />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;

const Card = ({
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
