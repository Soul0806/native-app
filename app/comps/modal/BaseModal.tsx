import { baseModalStyle } from "@/app/src/styles/modalStyle";
import * as React from "react";
import { Modal, Portal } from "react-native-paper";

type BaseModalProps = {
  visible: boolean,
  hideModal: () => void,
  // open?: boolean
  children: React.ReactNode;
}

const BaseModal = ({ visible, hideModal, children }: BaseModalProps ) => {  

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
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
    </>
  );
};

export default BaseModal;
