import { removeLastThreeChars } from "@/backend/libs/func";

import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Chip } from "react-native-paper";

// Fetch DATA
import { fetchSpecs } from "../api/fetchSpecs";

// Import COMPS
import { LeftPicker } from "../comps/LeftPicker";

// Import STYLES
import { styles } from "@/app/src/styles/globalStyles";

// function RouterGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const isAuth = false;

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (mounted && !isAuth) {
//       router.replace("/auth");
//     }
//   }, [isAuth, router, mounted]);

//   if (!mounted) {
//     return null; // 或者返回載入畫面
//   }

//   return <>{children}</>;
// }

type TBrand = {
  id: string;
  name: string;
};

type SimpleFlatListProps = {
  data?: string[];
};

export default function RootLayout() {
  //　設定 測式模式 / 主要模式
  const [test, setTest] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {test ? <TestLayout /> : <MainLayout />}
    </SafeAreaView>
  );
}

const SimpleFlatList: React.FC<SimpleFlatListProps> = ({ data }) => {
  const renderItem = ({ item }: { item: string }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  return (
    <FlatList<string>
      data={data ?? []}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

function TestLayout() {
  const [hour, setHour] = useState("6");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 100,
      }}
    >
      <Picker
        selectedValue={hour}
        style={{ height: 200, width: 100 }}
        onValueChange={(itemValue) => setHour(itemValue)}
      >
        {hours.map((h) => (
          <Picker.Item key={h} label={h} value={h} />
        ))}
      </Picker>

      <Picker
        selectedValue={minute}
        style={{ height: 200, width: 100 }}
        onValueChange={(itemValue) => setMinute(itemValue)}
      >
        {minutes.map((m) => (
          <Picker.Item key={m} label={m} value={m} />
        ))}
      </Picker>

      <Picker
        selectedValue={ampm}
        style={{ height: 200, width: 100 }}
        onValueChange={(itemValue) => setAmpm(itemValue)}
      >
        <Picker.Item label="AM" value="AM" />
        <Picker.Item label="PM" value="PM" />
      </Picker>
    </View>
  );
}
function MainLayout() {
  const [specs, setSpecs] = useState<Record<string, any>>({});
  const [inch, setInch] = useState<string>("");
  const [inches, setInches] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  // const [loading, setLoading] = useState(true); // 用來顯示加載中的狀態
  // const [error, setError] = useState<string | null>(null); // 用來顯示錯誤信息

  useEffect(() => {
    const loadSpecs = async () => {
      const specs = await fetchSpecs();
      setSpecs(specs);
    };

    loadSpecs();
  }, []);

  useEffect(() => {
    setInches(Object.keys(specs));
    setInch(Object.keys(specs)[0]);
  }, [specs]);

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  const itemSelected = (item: string) => {
    return selected.includes(item) ? styles.display_itemSelected : {};
  };

  const hasStock = (spec: string) => {
    let accumulator = 0;
    let sum = Object.values(specs[inch][spec]).reduce(
      (accumulator: any, currentValue: any) => {
        return accumulator + currentValue;
      },
      0
    );

    return {
      minWidth: 102,
      ...(sum == 0 && { borderColor: "red" }),
    };
  };

  return (
    <View style={styles.container}>
      <Text className="text-red-500">123</Text>
      <LeftPicker inch={inch} inches={inches} setInch={setInch} />
      <View style={styles.display}>
        <View>
          <Text style={styles.display_optionHeader}>{inch}</Text>
        </View>
        <ScrollView>
          <View style={styles.display_option}>
            {specs[inch] &&
              Object.keys(specs[inch])
                .sort()
                .map((spec) => (
                  <Chip
                    key={spec}
                    mode="outlined"
                    style={hasStock(spec)}
                    textStyle={styles.chipText}
                    selected={selected.includes(spec)}
                    onPress={() => toggleSelect(spec)}
                  >
                    {removeLastThreeChars(spec)}
                  </Chip>
                ))}
          </View>
        </ScrollView>
        <ScrollView>
          <View style={styles.display_overView}>
            {specs[inch] ? (
              Object.keys(specs[inch]).map((item, idx) => (
                <View key={idx} style={styles.display_item}>
                  <Text style={itemSelected(item)}>
                    {removeLastThreeChars(item)}
                  </Text>
                  {specs[inch][item] ? (
                    Object.keys(specs[inch][item])
                      .sort()
                      .map((loc, idx) => (
                        <View key={idx} style={styles.display_detail}>
                          <Text>
                            {loc} - {specs[inch][item][loc]}
                          </Text>
                        </View>
                      ))
                  ) : (
                    <Text>Loading</Text>
                  )}
                </View>
              ))
            ) : (
              <Text>載入中...</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
