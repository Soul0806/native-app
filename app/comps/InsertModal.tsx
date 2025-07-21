import { fetchSpecs } from "@/app/api/fetchSpecs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// type Props = {
//   visible: boolean;
//   hideModal: () => any;
// };

const InsertModal = () => {
  const [spec, setSpec] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const loadSpecs = async () => {
      const specs = await fetchSpecs();
      const inchSpec = Object.fromEntries(
        Object.entries(specs).map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            const specList = Object.keys(value);
            return [key, specList];
          }
          return [];
        })
      );
      setSpec(inchSpec);
    };
    loadSpecs();
  }, []);

  return (
    <ScrollView>
      {Object.entries(spec).map(([inch, specs]) => (
        <View key={inch}>
          <Text>{inch}</Text>
          {specs.map((spec: string) => (
            <Text key={spec}>{spec}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default InsertModal;

const styles = StyleSheet.create({
  stockContainer: {
    // paddingHorizontal: 15,
  },
  stock_sectionHeader: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: "#ffffff",
    color: "#333333",
    fontSize: 22,
    fontWeight: 800,
  },
  stock_sectionRow: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    gap: 20,
    paddingVertical: 3,
  },
  stock_sectionRow_wpLocAndQan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  stock_sectionRow_name: {
    minWidth: 100,
    fontSize: 20,
    marginLeft: 10,
  },
  stock_sectionRow_inContainer: {
    backgroundColor: "#FF9500",
    color: "#333333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  stock_sectionRow_outContainer: {
    backgroundColor: "limegreen",
    color: "#333333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
});
