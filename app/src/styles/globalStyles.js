import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    test: {
        borderWidth: 2,
        borderColor: 'red',        
    },
    safeArea: {
        flex: 1,              
    },
    container: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',                
    },
    test1: {        
                  
    },
    test2: {     
    },
    picker: {
        // flex: 1,
        width: 100,                
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 10,        
        // justifyContent: 'center',   
    },
    display: {
        flex: 1,
        flexDirection: 'column',
        maxHeight: 500,
        gap: 20,
    },
    display_option: {
        flexDirection: 'row',
        flexWrap: 'wrap',        
        gap: 10,
    },
    display_optionHeader: {
        fontSize: 32,
    },
    display_overView: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // gap: 5,
    },
    display_item: {
        width: '22%',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
        gap: 5,
    },
    display_itemSelected: {
        color: 'limegreen',
    },
    display_itemHeading: {

    },
    display_detail: {

    },
    chipText: {
        flex: 1,
        textAlign: 'right',
    }
})