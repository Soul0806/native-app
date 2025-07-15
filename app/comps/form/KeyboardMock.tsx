import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

type TProps = {
  // inputText: string;
  setSpec: Dispatch<SetStateAction<string>>;
};

const IPhoneKeyboard = ({ setSpec }: TProps) => {
  // const [inputText, setInputText] = useState("");
  const [isUppercase, setIsUppercase] = useState(false);

  // 鍵盤布局 - 模擬iPhone鍵盤
  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const handleKeyPress = (key: any) => {
    setSpec((prev) => prev + key);
    // const letter = isUppercase ? key.toUpperCase() : key;
    // setInputText((prev) => prev + letter);
  };

  const handleBackspace = () => {
    setSpec((prev) => prev.slice(0, -1));
  };

  const handleCapsLock = () => {
    setIsUppercase((prev) => !prev);
  };

  const handleSpace = () => {
    setSpec((prev) => prev + " ");
  };

  const renderKey = (
    key: any,
    isSpecial = false,
    specialText = "",
    flex = 1
  ) => {
    const displayText = isSpecial
      ? specialText
      : isUppercase
        ? key.toUpperCase()
        : key;

    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.key,
          { flex },
          isSpecial && styles.specialKey,
          key === "shift" && isUppercase && styles.activeShift,
        ]}
        onPress={() => {
          if (isSpecial) {
            if (key === "backspace") handleBackspace();
            else if (key === "shift") handleCapsLock();
            else if (key === "space") handleSpace();
          } else {
            handleKeyPress(key);
          }
        }}
      >
        <Text
          style={[
            styles.keyText,
            isSpecial && styles.specialKeyText,
            key === "shift" && isUppercase && styles.activeShiftText,
          ]}
        >
          {displayText}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.keyboard}>
        {/* 第一行 */}
        <View style={styles.row}>
          {keyboardLayout[0].map((key) => renderKey(key))}
        </View>

        {/* 第二行 */}
        <View style={styles.row}>
          {keyboardLayout[1].map((key) => renderKey(key))}
        </View>

        {/* 第三行 */}
        <View style={styles.row}>
          {renderKey("shift", true, "⇧", 1.5)}
          {keyboardLayout[2].map((key) => renderKey(key))}
          {renderKey("backspace", true, "⌫", 1.5)}
        </View>

        {/* 第四行 */}
        {/* <View style={styles.row}>
          {renderKey("numbers", true, "123", 1.5)}
          {renderKey("space", true, "space", 5)}
          {renderKey("return", true, "return", 1.5)}
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    textAlignVertical: "top",
  },
  keyboard: {
    backgroundColor: "#d1d3d4",
    paddingHorizontal: 3,
    paddingVertical: 5,
    // paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 3,
  },
  key: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginHorizontal: 2,
    minHeight: 42,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  specialKey: {
    backgroundColor: "#acb3bb",
  },
  activeShift: {
    backgroundColor: "#007AFF",
  },
  keyText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#000000",
  },
  specialKeyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  activeShiftText: {
    color: "#ffffff",
  },
});

export default IPhoneKeyboard;
