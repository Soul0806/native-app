import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";

export default function TabsLayout() {
    const initialPage = 'sale';
    return (
        <Tabs 
        initialRouteName={initialPage}
        screenOptions={{ tabBarActiveTintColor: "coral" }}>
            <Tabs.Screen name="sale" options={{ "title": 'Sale' }} />
            <Tabs.Screen name="home" options={{
                "title": 'home',
                tabBarIcon: ({ color, focused }) => {
                    return focused ?
                        (<FontAwesome name="home" size={24} color="black" />):
                        (<AntDesign name="home" size={24} color={color} />);                
                }
            }} />            
        </Tabs>
    );
}
