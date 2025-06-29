import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

// type TStyle = {
    
// }

const RadioBtn = (props: any) => {
    const { lists, style } = props
    const [value, setValue] = React.useState<string>(lists[0]);    

    return (
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>            
                <View style={style}>
                    {lists.map((list: string) => (
                        <View style={style}>
                            <Text>{list}</Text>
                            <RadioButton value={list} />
                        </View>
                    ))}
                </View>            
        </RadioButton.Group>
    );
};

export default RadioBtn;