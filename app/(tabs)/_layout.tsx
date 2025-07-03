import { SafeAreaView, Text, View } from "react-native";

export default function TabsLayout() {
  const initialPage = "sale";
  return (
    <SafeAreaView>
      <View>
        <Text className="text-red-500">123</Text>
      </View>
    </SafeAreaView>
    // <Tabs
    // initialRouteName={initialPage}
    // screenOptions={{ tabBarActiveTintColor: "coral" }}>
    //     <Tabs.Screen name="sale" options={{ "title": 'Sale' }} />
    //     <Tabs.Screen name="home" options={{
    //         "title": 'home',
    //         tabBarIcon: ({ color, focused }) => {
    //             return focused ?
    //                 (<FontAwesome name="home" size={24} color="black" />):
    //                 (<AntDesign name="home" size={24} color={color} />);
    //         }
    //     }} />
    // </Tabs>
  );
}
