import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/themes";

export const Styles = StyleSheet.create({
  service: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray5,
    padding: 12,
    borderWidth: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
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
  text: {
    flexGrow: 1,
    marginRight: 10,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray2,
    marginTop: 5,
  },
  price: {
    fontSize: FONT_SIZE.md,
    color: COLORS.orange,
    marginTop: 5,
  },
  containerButton: {
    margin: 3,
  },
});
