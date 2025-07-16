import * as React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";

import ManipulateButton from "@/app/comps/ManipulateButton";
import RecordModal from "@/app/comps/RecordModal";

export default function sale() {
  const [visible, setVisible] = React.useState<boolean>(true);
  const [display, setDisplay] = React.useState("magnify");
  const [reloadKey, setReloadKey] = React.useState<number>(0);

  const showModal = (e: string, reloadkey: number) => {
    setDisplay(e);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  console.log(display);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 10 };
  return (
    <PaperProvider>
      <ManipulateButton setReloadKey={setReloadKey} showModal={showModal} />
      {/* {display == "sale" && (
        <SaleModal visible={visible} hideModal={hideModal} />
      )}
      {display == "plus" && (
        <InsertModal visible={visible} hideModal={hideModal} />
      )} */}
      {display == "magnify" && (
        <RecordModal key={reloadKey} visible={visible} hideModal={hideModal} />
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
