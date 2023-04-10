import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { ReactNode, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import PriceRangeSelector from "./PriceRangeSelector";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const MAX_PRICE = 500;

const COLORS = [
  {
    color: "#D93F3E",
    label: "Red",
    itemCount: 4,
  },
  {
    color: "#FFFFFF",
    label: "White",
    itemCount: 2,
  },
  {
    color: "#58AB51",
    label: "Green",
    itemCount: 6,
  },
  {
    color: "#FB8C1D",
    label: "Orange",
    itemCount: 10,
  },
  {
    color: "#D3B38D",
    label: "Tan",
    itemCount: 10,
  },
  {
    color: "#FDE737",
    label: "Yellow",
    itemCount: 10,
  },
];

const SLEEVES = [
  {
    id: "sortsleeve",
    label: "Sort Sleeve",
    itemCount: 20,
  },
  {
    id: "longsleeve",
    label: "Long Sleeve",
    itemCount: 100,
  },
  {
    id: "sleeveless",
    label: "Sleeve Less",
    itemCount: 60,
  },
];

const FilterView = () => {
  const [startPrice, setStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <BottomSheetScrollView style={{ flex: 1 }}>
        <View style={{ paddingVertical: 24, gap: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "700",
                color: theme.colors.text,
              }}
            >
              Filters
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: theme.colors.text,
                  opacity: 0.5,
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          {/* Range Selector */}

          <PriceRangeSelector
            minPrice={0}
            maxPrice={MAX_PRICE}
            startPrice={startPrice}
            endPrice={endPrice}
            onStartPriceChange={setStartPrice}
            onEndPriceChange={setEndPrice}
          />

          {/* Sports Category Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Sports
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {new Array(7).fill("").map((_, i) => {
                return (
                  <Chip
                    key={i}
                    itemCount={i}
                    label="Item"
                    isSelected={i === 0}
                  />
                );
              })}
            </View>
          </View>
          {/* Color Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Color
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {COLORS.map((item, i) => {
                return (
                  <Chip
                    key={i}
                    itemCount={item.itemCount}
                    label={item.label}
                    left={
                      <View
                        style={{
                          backgroundColor: item.color,
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                        }}
                      />
                    }
                    isSelected={i === 0}
                  />
                );
              })}
            </View>
          </View>
          {/* Sleeves Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Sleeves
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {SLEEVES.map((item, i) => {
                return (
                  <Chip
                    key={i}
                    itemCount={item.itemCount}
                    label={item.label}
                    isSelected={i === 0}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
      {/* Button */}

      <View
        style={{
          padding: 24,
          paddingBottom: 24 + insets.bottom,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            height: 64,
            borderRadius: 64,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.background,
            }}
          >
            Apply filters
          </Text>

          <View
            style={{
              backgroundColor: theme.colors.card,
              width: 40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 12,
              right: 12,
              bottom: 12,
            }}
          >
            <Icons name="arrow-forward" size={24} color={theme.colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterView;

const Chip = ({
  isSelected,
  label,
  itemCount,
  left,
}: {
  isSelected: boolean;
  label: string;
  itemCount: number;
  left?: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: isSelected
          ? theme.colors.text
          : theme.colors.background,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {!!left && <View style={{ marginRight: 8 }}>{left}</View>}
      <Text
        style={{
          fontSize: 14,
          color: isSelected ? theme.colors.background : theme.colors.text,
        }}
      >
        {label} [{itemCount}]
      </Text>
    </View>
  );
};
