import { stockfilter1 } from "@/app/libs/funcs";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type TProps = {
  stock: Record<string, any>;
  spec: string;
};

function Stock({ stock, spec }: TProps) {
  return (
    <ScrollView style={styles.stockContainer}>
      {Object.entries(stockfilter1(stock, spec)).map(([inch, spec_loc]) => (
        <View key={inch}>
          <Text style={styles.stock_sectionHeader}>{inch}</Text>
          {Object.entries(spec_loc).map(([spec, locs]) => (
            <View key={spec} style={styles.stock_sectionRow}>
              <Text style={styles.stock_sectionRow_name}>{spec}</Text>
              {Object.entries(locs).map(([loc, num]) => (
                <View key={loc} style={styles.stock_sectionRow_wpLocAndQan}>
                  <Text
                    style={
                      loc == "貨櫃內"
                        ? styles.stock_sectionRow_inContainer
                        : styles.stock_sectionRow_outContainer
                    }
                  >
                    {loc}
                  </Text>
                  <Text>{num}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default Stock;

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
