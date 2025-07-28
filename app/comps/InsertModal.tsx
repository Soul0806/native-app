import { fetchAllStock } from "@/app/api/fetchAllstock";
import { addTire, getAreas, getTiresByAreaName } from "@/db";
import React, { useEffect, useState } from "react";
import {
  ActionSheetIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SpecList = {
  spec: string;
  quantity: number;
  area: number;
};

type Area = {
  id: number;
  name: string;
};

type Tires = {
  spec: string;
  id: number;
  area_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
};

const InsertModal = () => {
  const [stockByArea, setStockByArea] = useState<Record<string, SpecList[]>>(
    {}
  );
  const [areas, setAreas] = useState<Area[]>([]);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState("店外");
  const [recordsByArea, setRecordsByArea] = useState<Tires[]>([]);

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [unfolderSpec, setUnfolderSpec] = useState<Record<string, SpecList[]>>(
    {}
  );

  const [recordsLoaded, setRecordsLoaded] = useState<boolean>(false);
  const [text, setText] = useState("");

  const handleInsert = async () => {
    if (!text.trim()) return;
    try {
      // await insertItem(text.trim());
      // Alert.alert('✅ 成功', '資料已新增');
      setText("");
    } catch (e) {
      // Alert.alert('❌ 錯誤', '資料新增失敗');
    }
  };

  useEffect(() => {
    // console.log(111);
    const loadTires = async (area: string) => {
      const recordsByArea = await getTiresByAreaName(area);
      const areas = await getAreas();
      setRecordsByArea(recordsByArea);
      setAreas(areas);
      setRecordsLoaded(true);
    };

    loadTires(selectedValue);
  }, []);

  useEffect(() => {
    if (recordsLoaded) {
      const loadSpecs = async () => {
        const allStock = await fetchAllStock();
        const stockByArea = Object.fromEntries(
          Object.entries(allStock).map(([inch, specAndAQuan]) => {
            if (typeof specAndAQuan === "object" && specAndAQuan !== null) {
              const specList = Object.keys(specAndAQuan).map((spec) => {
                const item = recordsByArea.find((record) => {
                  return record.spec === spec && record.area_id === areaId;
                });
                return {
                  spec: spec,
                  quantity: item?.quantity ?? 0,
                  area: item?.area_id ?? areaId,
                };
                // }
              });
              return [inch, specList];
            }
            return [];
          })
        );
        setStockByArea(stockByArea);
      };

      loadSpecs();
    }
  }, [recordsByArea]);

  useEffect(() => {
    toggleSection();
  }, [stockByArea]);

  useEffect(() => {
    const data = Object.fromEntries(
      Object.entries(stockByArea).map(([inch, specs]) => {
        const group = expandedSections.includes(inch) ? specs : [];
        return [inch, group];
      })
    );
    setUnfolderSpec(data);
  }, [expandedSections]);

  const toggleSection = (title: string = "") => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((prev) => prev !== title)
        : [...prev, title]
    );
  };

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["取消", "倉庫外", "倉庫內", "店外", "店內"],
        // destructiveButtonIndex: 2, // 紅色「刪除」
        cancelButtonIndex: 0,
        title: "選擇位置",
        // message: "你想對這個項目做什麼？",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            setSelectedValue("倉庫外");
            break;
          case 2:
            setSelectedValue("倉庫內");
            break;
          case 3:
            setSelectedValue("店外");
            break;
          case 4:
            setSelectedValue("店內");
            break;
        }
      }
    );
  };

  const stockUpdated = async (spec: string, area: string, quantity: number) => {
    try {
      await addTire(spec, area, quantity);

      setStockByArea((prev) => {
        return Object.fromEntries(
          Object.entries(prev).map(([inch, specList]) => {
            const group = specList.map((item) => {
              if (item.spec === spec && item.area === areaId) {
                item.quantity += quantity;
              }
              return item;
            });
            return [inch, group];
          })
        );
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error("❌", err.message);
      } else {
        console.error("❌", err);
      }
    }
  };

  const existedSpec = (spec: string) => {
    const found = recordsByArea.find((item) => item.spec === spec);

    return <Text>{found?.quantity ?? 0}</Text>;
  };

  return (
    <View style={styles.insertContainer}>
      <View style={styles.insert_selectRow}>
        <TouchableOpacity onPress={showActionSheet}>
          <Text style={styles.insert_selectLocation}>
            選擇位置: {selectedValue}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.stockContainer}>
        {Object.entries(unfolderSpec).map(([inch, specList]) => (
          <View key={inch}>
            <TouchableOpacity onPress={() => toggleSection(inch)}>
              <Text style={styles.stock_sectionHeader}>{inch}</Text>
            </TouchableOpacity>
            {specList.map((item) => (
              // <Text>{item.quantity}</Text>
              <View key={item.spec} style={styles.stock_sectionRow}>
                <Text style={styles.stock_sectionRow_name}>{item.spec}</Text>
                <Text>{item.quantity}</Text>
                <Text>{item.area}</Text>
                <TouchableOpacity
                  onPress={() => stockUpdated(item.spec, selectedValue, -1)}
                >
                  <Text style={styles.stock_abstract}>- 減少</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => stockUpdated(item.spec, selectedValue, 1)}
                >
                  <Text style={styles.stock_add}>+ 增加</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default InsertModal;

const styles = StyleSheet.create({
  insertContainer: {
    flex: 1,
    padding: 5,
    gap: 20,
  },
  stockContainer: {},
  insert_controlRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  insert_selectLocation: {
    fontSize: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  selectBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
  },
  insertBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
  },
  insert_selectRow: {
    flexDirection: "row",
  },
  stock_sectionHeader: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: "#ffffff",
    color: "#333333",
    fontSize: 22,
    fontWeight: 800,
  },
  stock_sectionRow: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    gap: 10,
    paddingVertical: 3,
    minWidth: 100,
  },
  stock_abstract: {
    backgroundColor: "#FF9500",
    color: "#333333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  stock_add: {
    backgroundColor: "limegreen",
    color: "#333333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  stock_sectionRow_wpLocAndQan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  stock_sectionRow_name: {
    minWidth: 100,
    fontSize: 20,
    marginLeft: 10,
  },
  stock_sectionRow_inContainer: {
    backgroundColor: "#FF9500",
    color: "#333333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  stock_sectionRow_outContainer: {
    backgroundColor: "limegreen",
    color: "#333333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // 背景半透明
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // Android 陰影
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  picker: { width: 150, backgroundColor: "#eee" },
});
function getAllTables() {
  throw new Error("Function not implemented.");
}
