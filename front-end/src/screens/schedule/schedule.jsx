import React, { useState, useEffect } from "react";
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
  const [reservedHours, setReservedHours] = useState([]); // Horários reservados

  // Gera horários de 15 em 15 minutos entre 7h e 18h
  const generateHours = () => {
    const hours = [];
    for (let hour = 7; hour < 18; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        hours.push(
          `${hour.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return hours;
  };

  // Filtra horários disponíveis (bloqueia 30 minutos após horários reservados)
  const getAvailableHours = () => {
    const allHours = generateHours(); // Lista de todos os horários possíveis
    const blockedHours = new Set();

    // Bloqueia horário reservado e adiciona um bloqueio de 30 minutos após ele
    reservedHours.forEach((reserved) => {
      blockedHours.add(reserved);

      const [hour, minutes] = reserved.split(":").map(Number);
      const nextHour = new Date(0, 0, 0, hour, minutes + 30); // Calcula horário após 30 minutos
      blockedHours.add(
        `${nextHour.getHours().toString().padStart(2, "0")}:${nextHour
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    });

    // Retorna apenas horários disponíveis
    return allHours.filter((hour) => !blockedHours.has(hour));
  };

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

  // Carrega horários reservados da API
  async function LoadReservedHours(date) {
    try {
      const response = await api.get(`/appointments/${id_doctor}/${date}`);
      // Define os horários reservados
      setReservedHours(response.data.map((appt) => appt.booking_hour));
    } catch {
      Alert.alert("Erro ao carregar horários reservados.");
    }
  }

  // Atualiza os horários reservados quando a data é alterada
  useEffect(() => {
    if (selectedDate) {
      LoadReservedHours(selectedDate); // Busca horários ocupados da API
    }
  }, [selectedDate]);

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
            {generateHours().map((hour) => (
              <Picker.Item key={hour} label={hour} value={hour} />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <Button text="Confirmar Reserva" onPress={ClickBooking} />
      </View>
    </View>
  );
}
