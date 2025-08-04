import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type TProps = {
  list: Map<string, Map<string, string[]>>;
};

const Test = ({ list }: TProps) => {
  // console.log(JSON.stringify(list, null, 2));
  return (
    <ScrollView style={styles.recordContainer}>
      {/* <Text>{JSON.stringify(list, null, 2)}</Text> */}
      {[...list].map(([k, v]) => (
        <View>
          {Object.entries(v).map(([key, values]) => (
            <View key={key}>
              <Text style={styles.record_sectionHeader}>
                {k.slice(-2)}/{key}
              </Text>
              {values.map((v, i) => (
                <Text key={i} style={styles.record_sectionRow}>
                  {v}
                </Text>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default Test;

const styles = StyleSheet.create({
  recordContainer: {
    // paddingHorizontal: 15,
  },
  record_sectionHeader: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: "#ffffff",
    color: "#333333",
    fontSize: 22,
    fontWeight: 800,
  },
  record_sectionRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    marginLeft: 10,
    paddingVertical: 8,
    fontSize: 15,
  },
});
