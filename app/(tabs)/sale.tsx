import * as React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import ManipulateButton from "../comps/ManipulateButton";
import SaleModal from "../comps/SaleModal";

export default function sale() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => {    
    setVisible(false);
  };

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 10 };
  return (
    <PaperProvider>
      <ManipulateButton showModal={showModal} />
      <SaleModal visible={visible} hideModal={hideModal} />
      {/* <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <TextInput></TextInput>FFFFR
                </Modal>
            </Portal> */}
      {/* <Button style={{ marginTop: 30 }} onPress={showModal}>
                Show
            </Button> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
