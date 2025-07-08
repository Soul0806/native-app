import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderList = ({ list }: { list: Record<string, string[]> }) => {
  return (
    <View>
      {Object.entries(list).map(([key, values]) => (
        <View key={key}>
          <Text>{key}</Text>
          {values.map((v, i) => (
            <Text key={i} style={styles.list}>
              {v}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginLeft: 20,
    marginVertical: 10,
  },
});

export default OrderList;
