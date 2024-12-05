import { Text, View } from "react-native";

import Routes from "./src/routes/routes.js";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flexGrow: 1 }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
}
