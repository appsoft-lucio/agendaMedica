import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/themes.js";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray5,
    padding: 50,
    justifyContent: "space-between",
    flexGrow: 1,
  },
  containerLogo: {
    alignItems: "center",
  },
  logo: {
    width: 270,
    height: 60,
  },
  containerInput: {
    marginBottom: 15,
  },
  showPasswordButton: {
    position: "absolute",
    right: 10, // Distância da borda direita
    top: "50%", // Centralizado verticalmente
    transform: [{ translateY: -10 }], // Ajuste para centralizar
    padding: 5,
  },
  olhoIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.gray1, // Opcional, para ajustar a cor do ícone
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
