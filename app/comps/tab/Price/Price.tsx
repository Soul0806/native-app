import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TProps = {
  price: Record<string, string>;
};

const Price = ({ price }: TProps) => {
  // console.log(price);
  return (
    <View>
      {Object.entries(price).map(([k, v]) => (
        <View style={styles.wrapper_price}>
          <Text style={styles.spec}>{k}</Text>
          <Text>{v}</Text>
        </View>
      ))}
      {/* <Text>Price</Text>
      <Text>{JSON.stringify(price)}</Text> */}
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  wrapper_price: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  spec: {
    minWidth: 100,
  },
});
