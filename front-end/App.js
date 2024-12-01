import { Text, View } from "react-native";

import Login from "./src/screens/login/login.jsx";
import Account from "./src/screens/account/account.jsx";
import Home from "./src/screens/home/home.jsx";
import Calendar from "./src/screens/calendar/calendar";
import Profile from "./src/screens/profile/profile.jsx";
import Main from "./src/screens/main/main.jsx";
import Services from "./src/screens/services/services.jsx";
import Schedule from "./src/screens/schedule/schedule.jsx";

export default function App() {
  return (
    <View style={{ flexGrow: 1 }}>
      <Main />
    </View>
  );
}
