import Slider from "@react-native-community/slider";
import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
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
  const [charge, setCharge] = React.useState<number>(100);
  // const [chargeModal, setChargeModal] = React.useState<boolean>(false);

  // const chargeList = [...Array(10)].map((_, i) => i*100 + 100);
  const chargeList = ["1", "2", "3"];
  const pos: "absolute" = "absolute";
  const align: "center" = "center";

  const containerStyle = {
    ...baseModalStyle,

    position: pos,
    top: 0,
    alignSelf: align, // 水平置中
  };

  const chargeModalStyle = {
    ...baseModalStyle,

    position: pos,
    top: 200,
    alignSelf: align, // 水平置中
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

  // const hideChargeModal = () => {
  //   setChargeModal(false);
  // };

  const handleChargeChange = (value: number) => {
    setCharge(value);
  };

  return (
    <Portal>
      <Modal
        visible={true}
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
            />
            <DropdownComponent />
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
    // flex: 1,
    padding: 10,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
});

export default SaleModal;
