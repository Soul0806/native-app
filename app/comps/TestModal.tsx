import { fetchRecords } from "@/app/api/fatchRecords";
import TView from "@/app/comps/form/VText";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

function TestModal(props: any) {
  const { visible, hideModal } = props;

  const [isTruck, setIsisTruck] = useState<boolean>(false);
  const [carType, setCarType] = useState<string>("car");
  const [records, setRecords] = useState<Record<string, string[]>>({});

  const toggleSwitch = () => setIsisTruck((prev) => !prev);

  useEffect(() => {
    const loadRecords = async () => {
      const records = await fetchRecords();
      setRecords(records);
    };

    loadRecords();
  });

  const handlePress = (val: number) => {
    console.log(val);
  };

  useEffect(() => {}, [records]);
  return (
    <>
      <View style={styles.switch}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isTruck ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isTruck}
        />
        {!isTruck && <TView>轎,休旅車</TView>}
        {isTruck && <TView>貨車</TView>}
      </View>
      <View style={styles.row_btn}>
        {[1, 2, 3].map((n) => (
          <TouchableOpacity onPress={() => handlePress(n)}>
            <Text style={styles.circleText}>{n}</Text>
          </TouchableOpacity>
        ))}
        {/* <Text>1</Text>
        </TouchableOpacity>
        <Text>2</Text>
        <Text>3</Text> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switch: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
    gap: 10,
  },
  row_btn: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  circleText: {
    width: 60,
    height: 60,
    borderRadius: 30, // 半徑 = 寬高的一半

    margin: 10,
    backgroundColor: "#3498db",
    textAlign: "center",
    textAlignVertical: "center", // Android 專用（iOS 不生效）
    // color: "#fff",
    fontSize: 24,
    lineHeight: 60, // iOS 對齊用法（等於高度）
  },
});

export default TestModal;
