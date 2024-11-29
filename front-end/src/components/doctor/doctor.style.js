import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/themes.js";

export const style = StyleSheet.create({
  doctor: {
    flex: 1,
    backgroundColor: COLORS.gray5,
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.gray4,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: COLORS.gray1,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray1,
    marginTop: 8,
  },
  speciality: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray3,
  },
  icon: {
    marginRight: 8,
  },
});
