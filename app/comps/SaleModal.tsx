import Entypo from "@expo/vector-icons/Entypo";
import Slider from "@react-native-community/slider";
import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

import { baseModalStyle } from "../src/styles/modalStyle";
import DropdownComponent from "./form/DropDownComp";
const SaleModal = (props: any) => {
  const { visible, hideModal } = props;
  const screenWidth = Dimensions.get("window").width;

  const [active, setActive] = React.useState<string>("repair");
  const [charge, setCharge] = React.useState<number>(200);
  const [value, setValue] = React.useState(null);
  const [note, setNote] = React.useState("");

  const chargeList = ["1", "2", "3"];
  const pos: "absolute" = "absolute";
  const align: "center" = "center";

  const containerStyle = {
    ...baseModalStyle,

    position: pos,
    top: 0,
  };

  const chargeModalStyle = {
    ...baseModalStyle,

    position: pos,
    top: 200,
  };

  const onPress = (event: string) => {
    setActive(event);
  };

  const isActive = (selected: boolean) => {
    return {
      alignItems: align,
      paddingHorizontal: 50,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
      backgroundColor: selected ? "limegreen" : "white",
    };
  };

  const resetDropdown = () => {
    setValue(null);
  };

  const handleChargeChange = (value: number) => {
    setCharge(value);
  };

  const onChangeNote = (note: string) => {
    setNote(note);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => onPress("repair")}>
            <Text style={isActive("repair" === active)}>補胎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress("sale")}>
            <Text style={isActive("sale" === active)}>換胎</Text>
          </TouchableOpacity>
        </View>
        {active == "repair" ? (
          <View style={styles.repairPage}>
            <Text>選擇金額: {charge}</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              value={charge}
              onValueChange={handleChargeChange}
              minimumValue={100}
              maximumValue={1000}
              step={100}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="black"
            />
            <View style={styles.row}>
              <DropdownComponent value={value} setValue={setValue} />
              <TouchableOpacity onPress={resetDropdown}>
                {value && <Entypo name="cross" size={24} color="black" />}
              </TouchableOpacity>
            </View>
            <View style={styles.noteContainer}>
              <TextInput
                // editable
                multiline
                numberOfLines={4}
                maxLength={30}
                style={styles.note}
                onChangeText={onChangeNote}
                value={note}
                placeholder="備註"
              />
            </View>
          </View>
        ) : (
          <View style={styles.detail}>
            <Text>換胎</Text>
          </View>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detail: {
    padding: 20,
  },
  repairPage: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  note: {
    // paddingBottom: 40,
    // paddingHorizontal: 1
  },
  noteContainer: {
    borderBottomColor: "black",
    // borderWidth: 1,
    borderRadius: 10,
  },
});

export default SaleModal;
