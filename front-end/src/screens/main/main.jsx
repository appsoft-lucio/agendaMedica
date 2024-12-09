import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import icon from "../../constants/icon.js";
import Home from "../home/home.jsx";
import Calendar from "../calendar/calendar.jsx";
import Profile from "../profile/profile.jsx";
import { Image } from "react-native";
import { COLORS } from "../../constants/themes.js";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange, // Cor ativa (selecionada) das abas
        tabBarInactiveTintColor: "gray", // Cor inativa (não selecionada) das abas
      }}
    >
      <Tab.Screen
        style={{ color: COLORS.orange }}
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => {
            return (
              <Image source={icon.logo} style={{ width: 200, height: 40 }} />
            );
          },
          tabBarShowLabel: true,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={icon.home_orange}
                style={{ width: 30, height: 30, opacity: focused ? 1 : 0.3 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => {
            return (
              <Image source={icon.logo} style={{ width: 200, height: 40 }} />
            );
          },
          tabBarShowLabel: true,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={icon.calendar_orange}
                style={{ width: 30, height: 30, opacity: focused ? 1 : 0.3 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => {
            return (
              <Image source={icon.logo} style={{ width: 200, height: 40 }} />
            );
          },
          tabBarShowLabel: true,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={icon.profile_orange}
                style={{ width: 30, height: 30, opacity: focused ? 1 : 0.3 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
