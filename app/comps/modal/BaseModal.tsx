import { baseModalStyle } from "@/app/src/styles/modalStyle";
import * as React from "react";
import { Button, Modal, Portal } from "react-native-paper";

type BaseModalProps = React.PropsWithChildren<{}>;

const BaseModal = ({ children}: BaseModalProps ) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    ...baseModalStyle,
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          
          { children }
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </>
  );
};

export default BaseModal;
