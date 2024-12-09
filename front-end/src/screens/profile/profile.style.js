import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/themes.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.gray5,
    padding: 12,
  },
  item: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
    // Sombras para iOS
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 5, // Raio de desfoque da sombra

    // Sombras para Android
    elevation: 5, // Nível de elevação para gerar sombra
  },
  title: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
    marginBottom: 4,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
  },
  containerBtn: {
    marginTop: 25,
  },
  btn: {},
});
