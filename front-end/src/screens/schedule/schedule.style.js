import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/themes.js";

export const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.gray5,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  calendar: {
    elevation: 5,
    marginBottom: 30,
  },
  theme: {
    elevation: 5,
    todayTextColor: COLORS.orange,
    selectedDayBackgroundColor: COLORS.orange,
    selectedDayTextColor: COLORS.white,
    arrowColor: COLORS.orange,
  },
  textHour: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.gray2,
    marginTop: 20,
  },
});
