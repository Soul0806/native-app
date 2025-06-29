import * as React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";

import InsertModal from "../comps/InsertModal";
import ManipulateButton from "../comps/ManipulateButton";
import SaleModal from "../comps/SaleModal";



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

  React.useEffect(() => {

  }, [display])

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 10 };
  return (
    <PaperProvider>
      <ManipulateButton showModal={showModal} />
      {display == '1' && <SaleModal visible={visible} hideModal={hideModal} />}
      {display == '2' && <InsertModal />}            
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
