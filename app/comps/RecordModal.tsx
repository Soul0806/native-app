import { fetchRecords } from "@/app/api/fatchRecords";
import OrderList from "@/app/comps/form/OrderList";
import ScrollTo from "@/app/comps/form/ScrollTo";
import { entriesValueFilter } from "@/app/libs/funcs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const numbers = [...Array(10).keys()];

function RecordModal(props: any) {
  const scrollRef = useRef<ScrollView>(null);
  const { visible, hideModal } = props;

  const [isTruck, setIsisTruck] = useState<boolean>(false);
  const [carType, setCarType] = useState<string>("car");
  const [spec, setSpec] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [inch, setInch] = useState<string>("");
  const [records, setRecords] = useState<Record<string, string[]>>({});

  const [file, setFile] = useState<any>("");
  const toggleSwitch = () => setIsisTruck((prev) => !prev);

  useEffect(() => {
    const loadRecords = async () => {
      const records = await fetchRecords();
      setRecords(records);
    };

    loadRecords();
  }, []);

  useEffect(() => {
    // const w = width.length > 0 ? `-${width}` : '';
    const h = height.length > 0 ? `-${height}` : "";
    const i = inch.length > 0 ? `-${inch}` : "";
    setSpec(`${width}${h}${i}`);
  }, [width, height, inch]);

  const handlePress = (val: string) => {
    if (width.length >= 3) {
      if (+width[0] >= 7) {
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
      setWidth((prev) => prev + val);
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
    setWidth(width.slice(0, -1));
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

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
      <View style={styles.container}>
        <View style={styles.wrapper_btn}>
          {numbers.map((n, k) => (
            <TouchableOpacity key={k} onPress={() => handlePress(n.toString())}>
              <Text style={styles.circleText}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.wrapper_checkspec}>
          <View style={styles.wrapper_spec}>
            <Text style={styles.spec}>
              {width.slice(0, 3)}
              {+height > 0 &&
                ((+width[0] >= 7 && "-") || (+width[0] < 7 && "/"))}
              {height}
              {+inch > 0 && "-"}
              {inch}
            </Text>
          </View>
          <View>
            {spec.length > 0 && (
              <TouchableOpacity onPress={back}>
                <FontAwesome5
                  style={styles.back}
                  name="backspace"
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.wrapper_scroll_to}>
          <ScrollTo style={styles.scroll_to_top} handler={scrollToTop}>
            <Text></Text>
          </ScrollTo>
          <ScrollTo style={styles.scroll_to_end} handler={scrollToBottom}>
            <FontAwesome5 name="arrow-circle-down" size={30} color="black" />
          </ScrollTo>
          {/* <TouchableOpacity
            style={styles.scroll_to_end}
            onPress={scrollToBottom}
          ></TouchableOpacity> */}
          <ScrollView ref={scrollRef}>
            {records && <OrderList list={entriesValueFilter(records, spec)} />}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    gap: 15,
  },
  circleText: {
    width: 50,
    height: 50,
    borderRadius: 25, // 半徑 = 寬高的一半

    margin: 10,
    backgroundColor: "#3498db",
    textAlign: "center",
    textAlignVertical: "center", // Android 專用（iOS 不生效）
    // color: "#fff",
    fontSize: 24,
    lineHeight: 50, // iOS 對齊用法（等於高度）
  },
  wrapper_checkspec: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 40,
    borderRadius: 10,
  },
  back: {
    fontSize: 50,
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
  wrapper_spec: {
    width: "80%",
  },
  spec: {
    fontSize: 50,
    marginLeft: 10,
    textAlign: "center",
  },
  wrapper_btn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  wrapper_scroll_to: {
    flex: 1,
    position: "relative",
  },
  scroll_to_top: {
    position: "absolute",
    width: "100%",
    height: 30,
    zIndex: 9,
  },
  scroll_to_end: {
    position: "absolute",
    top: 0,
    right: 15,
    zIndex: 10,
  },
});

export default RecordModal;
