import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import BaseModal from "./modal/BaseModal";

import { fetchBrands } from "../api/fetchBrands";
import config from "../config/apiConfig";
import Indicator from "./indicator/indicator";

const InsertModal = (props: any) => {
  const { visible, hideModal } = props;
  const [brand, setBrand] = useState<string>("");
  const [allBrands, setAllBrands] = useState<any | []>([]);
  const [ error , setError ] = useState<boolean>(false);

  useEffect(() => {
    const loadBrands = async () => {
      const brands = await fetchBrands();
      setAllBrands(brands);
    };
    loadBrands();    
  }, []);

  const handleBrandChange = (brand: string) => {
    setError(false);
    setBrand(brand);
  };

  const handleSubmit = async () => {    
    
    const existed = allBrands.some((b: any) => 
      brand.toLowerCase() == b["name"].toLowerCase()            
    ) 

    if(existed) {
      setError(true)
      return;
    }
    const payload = {
      name: brand,
    };

    try {
      const res = await fetch(`${config.API_BASE_URL}/brand/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "00001111",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("提交失敗");
      const data = await res.json();
      setAllBrands((prev: any) => [...prev, data]);
    } catch (err) {
      Alert.alert("錯誤");
    }
  };

  return (
    <>
      <BaseModal visible={visible} hideModal={hideModal}>
        <Text>現有輪胎品牌</Text>
        <View style={styles.row_list}>
          {allBrands.length === 0 ? (
            <Indicator />
          ) : (
            allBrands.map((brand: any) => 
            <Text 
                key={brand.name}
                style={styles.item}
                >{brand.name}</Text>)
          )}
        </View>
        <Text style={styles.label}>新增輪胎品牌</Text>
        <TextInput value={brand} onChangeText={handleBrandChange} />
        {error && <Text>品牌已存在</Text>}
        <Button onPress={handleSubmit}>確定</Button>
      </BaseModal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 20,
  },
  row_list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginVertical: 5,
    marginRight: 5,
  }
});

export default InsertModal;
