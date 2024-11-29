import { Text, View } from "react-native";

import Btn from "./src/components/button/button";
import Login from "./src/screens/login/login.jsx";
import Account from "./src/screens/account/account.jsx";
import Home from "./src/screens/home/home.jsx";
import Calendar from "./src/screens/calendar/calendar";
import Appointment from "./src/components/appointment/appointment.jsx";
import Profile from "./src/screens/profile/profile.jsx";
import Main from "./src/screens/main/main.jsx";

export default function App() {
  return (
    <View style={{ flexGrow: 1 }}>
      <Main />
    </View>
  );
}
