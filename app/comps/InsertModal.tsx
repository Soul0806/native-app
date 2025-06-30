import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import BaseModal from "./modal/BaseModal";

import { fetchBrands } from "../api/fetchBrands";
import config from "../config/apiConfig";



const InsertModal = (props: any) => {
  
  const { visible, hideModal } = props;
  const [brand, setBrand] = useState<string>("");
  const [allBrands, setAllBrands ] = useState<any | []>([]);
  
  useEffect(() => {
    
    const loadBrands = async () => {
        const brands = await fetchBrands();                                               
        setAllBrands(brands);
    }

    loadBrands();
  }, [])

  const handleBrandChange = (brand: string) => {
    setBrand(brand);
  };

  const handleSubmit = async () => {
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
      setAllBrands((prev: any) => [
        ...prev,
        data
      ]);
 
    } catch (err) {      
      Alert.alert("錯誤");
    }
  };  
  return (
    <>
      <BaseModal visible={visible} hideModal={hideModal}>      
        {allBrands.map((brand: any) => (
          <Text>{brand.name}</Text>    
        ))}        
        <Text style={styles.label}>新增輪胎品牌</Text>
        <TextInput value={brand} onChangeText={handleBrandChange} />
        <Button onPress={handleSubmit}>確定</Button>
      </BaseModal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 20,
  },
});

export default InsertModal;
