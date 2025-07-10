import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const initialPage = "sale";
  return (
    <Tabs
      initialRouteName={initialPage}
      screenOptions={{ tabBarActiveTintColor: "coral" }}
    >
      <Tabs.Screen name="sale" options={{ title: "Sale" }} />
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FontAwesome5 name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color={color} />
            );
          },
        }}
      />
    </Tabs>
  );
}
