import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
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
                  source={icon.home}
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
                  source={icon.calendar}
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
                  source={icon.profile}
                  style={{ width: 30, height: 30, opacity: focused ? 1 : 0.3 }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
