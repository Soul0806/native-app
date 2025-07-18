import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type TProps = {
  styleHeader?: ViewStyle;
  list: Record<string, string[]>;
};

const OrderList = ({ styleHeader, list }: TProps) => {
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
    marginLeft: 10,
    marginVertical: 10,
  },
});

export default OrderList;
