import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Styles } from "./schedule.style";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../constants/calendar";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/button/button.jsx";
import api from "../../constants/api.js";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function Schedule(props) {
  const id_doctor = props.route.params.id_doctor;
  const id_service = props.route.params.id_service;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  async function ClickBooking() {
    try {
      const response = await api.post("/appointments", {
        id_doctor: id_doctor,
        id_service: id_service,
        booking_date: selectedDate,
        booking_hour: selectedHour,
      });
      if (response.data?.id_appointment) {
        Alert.alert(
          "Reserva Confirmada",
          `Sua reserva foi feita com sucesso para ${selectedDate} às ${selectedHour}.`,
          [
            {
              text: "OK",
              onPress: () => props.navigation.popToTop(), // Navega para a tela inicial
            },
          ]
        );
      }
    } catch (error) {
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Aconteceu um erro no login. Tente mais tarde");
    }
  }

  return (
    <View style={Styles.container}>
      <View>
        <Calendar
          style={Styles.calendar}
          theme={Styles.theme}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
          minDate={new Date().toDateString()}
        />
        <View>
          <Text style={Styles.textHour}>Horário</Text>
        </View>
        <View>
          <Picker
            selectedValue={selectedHour}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedHour(itemValue);
            }}
          >
            <Picker.Item label="08:00" value="08:00" />
            <Picker.Item label="09:00" value="09:00" />
            <Picker.Item label="10:00" value="10:00" />
          </Picker>
        </View>
      </View>
      <View>
        <Button text="Confirmar Reserva" onPress={ClickBooking} />
      </View>
    </View>
  );
}
