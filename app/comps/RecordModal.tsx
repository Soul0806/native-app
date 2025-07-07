import { fetchRecords } from "@/app/api/fatchRecords";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const numbers = [...Array(10).keys()];

function TestModal(props: any) {
  const { visible, hideModal } = props;

  const [isTruck, setIsisTruck] = useState<boolean>(false);
  const [carType, setCarType] = useState<string>("car");
  const [spec, setSpec] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [inch, setInch] = useState<string>("");
  const [records, setRecords] = useState<Record<string, string[]>>({});

  const toggleSwitch = () => setIsisTruck((prev) => !prev);

  useEffect(() => {
    const loadRecords = async () => {
      const records = await fetchRecords();
      setRecords(records);
    };

    loadRecords();
  });

  const handlePress = (val: string) => {
    if (spec.length >= 3) {
      if (+spec[0] >= 7) {
        if (inch.length < 3) {
          setInch((prev) => prev + val);
        }
      } else {
        if (height.length < 2) {
          setHeight((prev) => prev + val);
        } else {
          setInch((prev) => prev + val);
        }
      }
    } else {
      setSpec((prev) => prev + val);
    }
  };

  const back = () => {
    if (+inch.length > 0) {
      setInch(inch.slice(0, -1));
      return;
    }
    if (+height.length > 0) {
      setHeight(height.slice(0, -1));
      return;
    }
    setSpec(spec.slice(0, -1));
  };

  useEffect(() => {}, [records]);
  return (
    <>
      {/* <View style={styles.switch}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isTruck ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isTruck}
        />
        {!isTruck && <TView>轎,休旅車</TView>}
        {isTruck && <TView>貨車</TView>}
      </View> */}
      <View style={styles.row_btn}>
        {numbers.map((n) => (
          <TouchableOpacity onPress={() => handlePress(n.toString())}>
            <Text style={styles.circleText}>{n}</Text>
          </TouchableOpacity>
        ))}
        {/* <Text>1</Text>
        </TouchableOpacity>
        <Text>2</Text>
        <Text>3</Text> */}
      </View>
      <View style={styles.wrap_checkspec}>
        <View>
          <Text style={styles.spec}>
            {spec.slice(0, 3)}
            {+height > 0 && ((+spec[0] >= 7 && "-") || (+spec[0] < 7 && "/"))}
            {height}
            {+inch > 0 && "-"}
            {inch}
            {/* {spec.length > 3 && +spec[0] < 7 && <Text>/</Text>} */}
          </Text>
        </View>
        <TouchableOpacity onPress={back}>
          <Text style={styles.back}>{`<-`}</Text>
        </TouchableOpacity>
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
  wrap_checkspec: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 40,
  },
  back: {
    fontSize: 40,
  },
  // switch: {
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   margin: 10,
  //   gap: 10,
  // },
  // check_spec: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
  spec: {
    fontSize: 30,
  },
  row_btn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

export default TestModal;
