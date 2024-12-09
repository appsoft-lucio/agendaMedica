import { COLORS, FONT_SIZE } from "../../constants/themes.js";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray5,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    flex: 1,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    marginTop: 3,
    marginLeft: 10,
    marginBottom: 10,
    paddingLeft: 15,
  },
});
