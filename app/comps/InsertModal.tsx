import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import BaseModal from "./modal/BaseModal";

const InsertModal = () => {
    const [ brand, setBrand ] = useState<string>('');

    const handleBrandChange = (brand: string) => {
        setBrand(brand)
    }

    const handleSumit = () => {
        console.log({brand});
    }

    return (
        <>            
            <BaseModal>
                <Text style={styles.label}>新增輪胎品牌</Text>
                <TextInput 
                value={brand}
                onChangeText={handleBrandChange}
                />
                <Button　onPress={handleSumit}>    
                    確定                
                </Button>
            </BaseModal>
        </>
    )
};

const styles = StyleSheet.create({
    label: {
        marginVertical: 20,
    }
})

export default InsertModal