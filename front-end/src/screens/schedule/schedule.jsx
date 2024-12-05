import React, { useState } from "react";
import { Text, View } from "react-native";
import { Styles } from "./schedule.style";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../constants/calendar";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/button/button.jsx";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function Schedule(props) {
  const id_doctor = props.route.params.id_doctor;
  const id_service = props.route.params.id_service;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  function ClickBooking() {}

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
