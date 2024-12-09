import Routes from "../src/routes/routes.js";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "../src/contexts/auth.js";
import styles from "./App.style.js";

export default function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
