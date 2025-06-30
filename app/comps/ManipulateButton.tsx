import React from 'react';
import { FAB, Portal } from 'react-native-paper';

export function ManipulateButton(props: any) {
    
    const { showModal } = props
    type FabState = { open: boolean };
    
    const [state, setState] = React.useState<FabState>({ open: false });

    const onStateChange = ({ open }: FabState) => setState({ open });

    const { open } = state;

    return (
        <Portal>
            <FAB.Group                                
                open={open}
                visible
                icon={open ? 'close' : 'plus'}
                actions={[                    
                    {                        
                        icon: 'plus',
                        label: '新增',
                        onPress: function() {
                           showModal(this.icon);
                        }
                    },
                    {
                        icon: 'sale',
                        label: '銷售',
                        onPress: function() {
                            showModal(this.icon);
                        }
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
export default ManipulateButton        