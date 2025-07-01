import BaseModal from "./modal/BaseModal";
import PaperTabs from "./tab/PaperTabs";

function TestModal(props: any) {
    const { visible, hideModal } = props;
    console.log(123);
    return (
        <BaseModal visible={visible} hideModal={hideModal}>
            <PaperTabs />
        </BaseModal>
    )
}

export default TestModal;