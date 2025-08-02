import { fetchRecords, fetchTestRecords } from "@/app/api/fetchRecords";
import { fetchSpecs } from "@/app/api/fetchSpecs";
import IPhoneKeyboard from "@/app/comps/form/KeyboardMock";
import Record from "@/app/comps/tab/record/Record";
import Stock from "@/app/comps/tab/stock/Stock";
import Test from "@/app/comps/tab/test1/Test";
import VTabs from "@/app/comps/tab/VTabs";
import { entriesValueFilter, insertAt } from "@/app/libs/funcs";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const numbers = [...Array(10).keys()];

const tabs = [
  { key: "Record", name: "銷售" },
  { key: "Stock", name: "庫存" },
  { key: "Test", name: "測試" },
];

function MainModal(props: any) {
  const scrollRef = useRef<ScrollView>(null);
  const [spec, setSpec] = useState<string>("");
  const [records, setRecords] = useState<Record<string, string[]> | null>(null);
  const [tabActive, setTabActive] = useState<string>("Record");
  const [stock, setStock] = useState<Record<string, any>>({});

  const autoScrollRef = useRef<ScrollView>(null);
  const hasScrolled = useRef(false); // 防止重複觸發

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;

    if (y >= 50 && !hasScrolled.current) {
      hasScrolled.current = true;
      autoScrollRef.current?.scrollTo({ y: 150, animated: true });
    }
    if (y < 50) {
      hasScrolled.current = false;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const [specs, records, testRecords] = await Promise.all([
          fetchSpecs(),
          fetchRecords(),
          fetchTestRecords(),
        ]);
        setStock(specs);
        setRecords(records);
        console.log(JSON.stringify(testRecords, null, 2));
      } catch (err) {
        console.error("資料抓取失敗", err);
      }
    })();
  }, []);

  useEffect(() => {}, [records]);

  const handlePress = (val: string) => {
    let combiledStr: string = spec + val;
    if (/^\d/.test(combiledStr)) {
      if (combiledStr.length == 4) {
        combiledStr = insertAt(combiledStr, "-", 3);
      }
      if (combiledStr.length == 7) {
        combiledStr = insertAt(combiledStr, "-", 6);
      }
    }
    return () => setSpec(combiledStr);
  };

  const backward = () => {
    setSpec((prev) => prev.slice(0, -1));
  };

  const clear = () => {
    setSpec("");
  };

  const tabLayout = () => {
    switch (tabActive) {
      case "Record":
        return !records ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Record list={entriesValueFilter(records, spec)} />
        );
      case "Stock":
        return !stock ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Stock stock={stock} spec={spec} />
        );
      case "Test":
        return <Test list={entriesValueFilter(records, spec)} />;
      // return !stock ? (
      //   <ActivityIndicator size="small" color="#0000ff" />
      // ) : (
      //   <Stock stock={stock} spec={spec} />
      // );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          ref={autoScrollRef}
          style={styles.wrapper_inputArea}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.wrapper_inputArea_wpBtn}>
            {numbers.map((n, idx) => (
              <TouchableOpacity key={idx} onPress={handlePress(n.toString())}>
                <Text style={styles.wrapper_inputArea_circle}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <IPhoneKeyboard setSpec={setSpec} />
        </ScrollView>
        <View style={styles.wrapper_searchArea}>
          <Text style={styles.wrapper_searchArea_spec}>{spec}</Text>
          {spec.length > 0 && (
            <View style={styles.wrapper_searchArea_wpManipulate}>
              <TouchableOpacity onPress={backward}>
                <FontAwesome5
                  style={styles.wrapper_searchArea_manipulate}
                  name="backspace"
                  color="red"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={clear}>
                <AntDesign
                  style={styles.wrapper_searchArea_manipulate}
                  name="closecircle"
                  color="red"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.wrapper_tabs}>
          <VTabs
            tabs={tabs}
            tabActive={tabActive}
            setTabActive={setTabActive}
          />
        </View>
        <View style={styles.wrapper_tabLayout}>{tabLayout()}</View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    gap: 20,
  },
  wrapper_inputArea: {
    maxHeight: 150,
    // borderWidth: 3,
  },
  wrapper_inputArea_wpBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    flexWrap: "wrap",
    // padding: 3,
    minHeight: 150,
  },
  wrapper_inputArea_circle: {
    width: 50,
    height: 50,
    borderRadius: 25, // 半徑 = 寬高的一半

    margin: 10,
    backgroundColor: "#007AFF",
    textAlign: "center",
    textAlignVertical: "center", // Android 專用（iOS 不生效）
    fontSize: 24,
    color: "white",
    lineHeight: 50, // iOS 對齊用法（等於高度）
  },
  wrapper_searchArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginBottom: 5,
    // fontSize: 40,
  },
  wrapper_searchArea_spec: {
    fontSize: 40,
  },
  wrapper_searchArea_wpManipulate: {
    flexDirection: "row",
    gap: 10,
  },
  wrapper_searchArea_manipulate: {
    fontSize: 40,
  },
  wrapper_tabs: {
    flexDirection: "row",
    marginLeft: 5,
    gap: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
  },
  wrapper_tabLayout: {
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

export default MainModal;
