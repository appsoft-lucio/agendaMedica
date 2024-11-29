import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/themes.js";
export const styles = StyleSheet.create({
  appointment: {
    flexGrow: 1,
    backgroundColor: COLORS.gray4,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,

    // Estilos de sombra (sombras são usadas para dar destaque ou profundidade visual)
    shadowColor: COLORS.gray1,
    // Define a cor da sombra como preta.
    shadowOffset: { width: 3, height: 3 },
    // Define o deslocamento da sombra em 3 unidades horizontalmente e verticalmente.
    shadowOpacity: 0.2,
    // Define a opacidade da sombra, que será levemente visível.
    shadowRadius: 5,
    // Aplica um raio de desfoque à sombra, para que ela não fique com bordas nítidas.

    // Sombras específicas para Android
    elevation: 5,
    // O 'elevation' gera uma sombra no Android, e o valor 5 indica a intensidade da elevação.
  },
  name: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    marginBottom: 2,
  },
  specialty: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
    marginBottom: 4,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
  book: {
    flexDirection: "row",
  },
  containerBook: {
    flex: 1,
  },
  containerButton: {},
  container: {
    flexDirection: "row",
  },
});
