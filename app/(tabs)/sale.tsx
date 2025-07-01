import * as React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";

import InsertModal from "../comps/InsertModal";
import ManipulateButton from "../comps/ManipulateButton";
import SaleModal from "../comps/SaleModal";
import TestModal from "../comps/TestModal";



export default function sale() {
  const [visible, setVisible] = React.useState(false);
  const [display, setDisplay] = React.useState('');

  const showModal = (e) => {
    setDisplay(e);
    setVisible(true);
  }
  const hideModal = () => {    
    setVisible(false);
  };

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 10 };
  return (
    <PaperProvider>
      <ManipulateButton showModal={showModal} />
      {display == 'sale' && <SaleModal visible={visible} hideModal={hideModal} />}
      {display == 'plus' && <InsertModal visible={visible} hideModal={hideModal}/>}            
      {display == 'test' && <TestModal visible={visible} hideModal={hideModal} />}            
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
