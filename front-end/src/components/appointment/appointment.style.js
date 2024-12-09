import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/themes.js";
import { appointments } from "../../constants/data.js";
export const styles = StyleSheet.create({
  appointment: {
    flex: 1,
    backgroundColor: COLORS.gray5,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: 10,
    marginBottom: 10,
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
    elevation: 8,
    // O 'elevation' gera uma sombra no Android, e o valor 8 indica a intensidade da elevação.
  },
  name: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray1,
    marginBottom: 2,
  },
  specialty: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
    marginBottom: 5,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 8,
    marginBottom: 8,
  },
  bookingDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
    marginTop: 5,
  },
  bookingHour: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
    marginTop: 5,
  },
  booking: {
    flexDirection: "row",
  },
  containerBooking: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
  },
  containerButton: {
    margin: 5,
    justifyContent: "center",
  },
});
