import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/themes.js";

export const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    padding: 12,
    // Sombras para iOS
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 5, // Raio de desfoque da sombra

    // Sombras para Android
    elevation: 5, // Nível de elevação para gerar sombra
  },
  primary: {
    backgroundColor: COLORS.orange,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  text: {
    color: COLORS.gray4,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
  },
});
