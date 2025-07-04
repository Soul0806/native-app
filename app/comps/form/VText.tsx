import React from "react";
import { Text, View } from "react-native";

const TView = ({ children }: { children: React.ReactNode }) => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};

export default TView;
