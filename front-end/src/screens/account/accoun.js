import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/themes.js";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray5,
    padding: 50,
    justifyContent: "space-between",
    flex: 1,
  },
  containerLogo: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: undefined,
    aspectRatio: 2,
  },
  containerInput: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: COLORS.gray4,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  footerLink: {
    color: COLORS.orange,
  },
});
