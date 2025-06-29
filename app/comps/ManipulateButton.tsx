import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';

export function ManipulateButton(props: any) {
    
    const { showModal } = props

    type FabState = { open: boolean };
    const [state, setState] = React.useState<FabState>({ open: false });

    const onStateChange = ({ open }: FabState) => setState({ open });

    const { open } = state;

    const show = () => {
        showModal();
    }

    return (
        <Portal>
            <FAB.Group                                
                open={open}
                visible
                icon={open ? 'close' : 'plus'}
                actions={[
                    { icon: 'plus', onPress: () => console.log('Pressed add') },
                    {
                        icon: 'plus',
                        label: '動作2',
                        onPress: () => console.log('Pressed star'),
                    },
                    {
                        icon: 'sale',
                        label: '銷售',
                        onPress: show,
                    }
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                    }
                }}
            />
        </Portal>
    );
}

const styles = StyleSheet.create({

})

export default ManipulateButton        