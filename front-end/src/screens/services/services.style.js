import { COLORS, FONT_SIZE } from "../../constants/themes.js";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray5,
    flexGrow: 1,
  },
  banner: {
    backgroundColor: COLORS.orange,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 30,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray5,
    fontWeight: "bold",
    marginTop: 5,
  },
  speciality: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray4,
    marginTop: 5,
  },
});
