import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../screens/main/main.jsx";
import Services from "../screens/services/services.jsx";
import Schedule from "../screens/schedule/schedule.jsx";
import { COLORS } from "../constants/themes.js";

const Stack = createNativeStackNavigator();

function RoutesPrivate() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Services"
        component={Services}
        options={{
          headerShown: true,
          headerTitle: "Serviços",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTintColor: COLORS.gray5,
          headerStyle: {
            backgroundColor: COLORS.orange,
            color: COLORS.gray5,
          },
        }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: true,
          headerTitle: "Agenda",
          headerTitleAlign: "center",
          headerShadowVisible: true,
          headerTintColor: COLORS.orange,
        }}
      />
    </Stack.Navigator>
  );
}

export default RoutesPrivate;
