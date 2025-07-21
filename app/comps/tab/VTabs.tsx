import React, { Dispatch } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Tab = {
  key: string;
  name: string;
};

type TProps = {
  tabs: Tab[];
  tabActive: string;
  setTabActive: Dispatch<React.SetStateAction<string>>;
  //   children?: React.ReactNode;
};

function VTabs({ tabs, tabActive, setTabActive }: TProps) {
  const tabOnPress = (tab: string) => {
    setTabActive(tab);
  };

  return (
    <>
      {tabs.map((tab: Tab) => (
        <TouchableOpacity key={tab.key} onPress={() => tabOnPress(tab.key)}>
          <Text style={[styles.tab, tabActive == tab.key ? styles.active : ""]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
}

export default VTabs;

const styles = StyleSheet.create({
  tab: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  active: {
    backgroundColor: "#007AFF",
    color: "white",
  },
});
