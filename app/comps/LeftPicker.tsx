import React, { useRef, useState } from "react";

// Core comps
import { Picker } from '@react-native-picker/picker';
import { Alert, Animated, LayoutChangeEvent, View } from "react-native";

// Import styles
import { Button } from "react-native-paper";
import { styles } from "../src/styles/globalStyles";
export function LeftPicker({ inch, inches, setInch }: any) {

    // const translateY = useRef(new Animated.Value(0)).current;

    const animatedValue = useRef(new Animated.Value(0)).current;
    const [pickerLayout, setPickerLayout] = useState(null);
    const [isMoveTop, setIsMoveTop] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);


    const handlePickerLayout = (event: LayoutChangeEvent) => {
        const { x, y, width, height } = event.nativeEvent.layout;        
        setPickerLayout({ x, y, width, height });
    };

    // 計算移動距離的函數
    const calculateMoveDistance = () => {
        if (pickerLayout) {
            // 從 picker 當前位置移動到頂部（SafeArea 下方）
            const targetY = 30; // 頂部位置（包含一些 padding）
            const currentY = pickerLayout.y;
            return -(currentY + pickerLayout.height/2 - targetY); // 負值表示向上移動
        }
    };

    const movePickerToTop = () => {
        const moveDistance = calculateMoveDistance();

        Animated.spring(animatedValue, {
            toValue: moveDistance,
            tension: 80,
            friction: 8,
            useNativeDriver: true,
        }).start(() => {
            // setIsMovedToTop(true);
        });
    };

    const handleValueChange = (value: string) => {
        setInch(value);
        setIsMoveTop(true);
        setTimeout(() => {
            movePickerToTop();
        }, 100);
    };

    const resetPicker = () => {
        setIsMoveTop(false);
        Animated.spring(animatedValue, {
            toValue: 0,
            tension: 80,
            friction: 8,
            useNativeDriver: true,
        }).start(() => {
        });
    }

    const test = () => {
        Alert.alert('123');
    };

    return (
        <View style={styles.picker}>
            <Animated.View /* style={[{transform: [{ translateY: animatedValue }] }]} */ onLayout={handlePickerLayout}>
                <View style={styles.test1}>
                    {!isMoveTop ?
                        <Picker
                            selectedValue={inch}
                            onValueChange={handleValueChange}
                        >
                            {inches.map((i: string) => (
                                <Picker.Item key={i} label={i} value={i} />
                            ))}
                        </Picker> :
                        <Button mode="contained" onPress={resetPicker}>
                            {inch}
                        </Button>
                    }
                </View>
            </Animated.View >    
            {/* <View style={styles.test2}>
                <Text>abcabcabcabcabcabcabcabc1223</Text>
            </View>         */}
        </View >
    )
}

