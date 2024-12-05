import { Text } from "react-native";
import RoutesOpen from "./routesOpen.js";
import RoutesPrivate from "./routesPrivate.js";

function Routes() {
  const user = {
    // id_user: 1,
  };
  return user.id_user ? <RoutesPrivate /> : <RoutesOpen />;
}

export default Routes;
