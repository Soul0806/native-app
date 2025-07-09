import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type TProps = {
  style?: ViewStyle;
  handler?: () => any;
  children: React.ReactNode;
};

const ScrollTo = ({ style, handler, children }: TProps) => {
  return (
    <TouchableOpacity style={style} onPress={handler}>
      {children}
    </TouchableOpacity>
  );
};

export default ScrollTo;

const styles = StyleSheet.create({});
