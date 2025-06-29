import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import BaseModal from "./modal/BaseModal";

const InsertModal = () => {
  const [brand, setBrand] = useState<string>("");

  const handleBrandChange = (brand: string) => {
    setBrand(brand);
  };

//   const handleSumit = () => {
//     console.log({ brand });
//   };

  const handleSubmit = async () => {
    const payload = {
      name: brand,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/test1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "x-api-key": "00001111"
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("提交失敗");

      const data = await res.json();
      return data
    } catch (err) {
     console.log(err);
      Alert.alert('錯誤');
    }
  };

  return (
    <>
      <BaseModal>
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
