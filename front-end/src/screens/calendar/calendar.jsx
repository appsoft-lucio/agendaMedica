import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View, useIsFocused } from "react-native";
import { styles } from "./calendar.style.js";
import Appointment from "../../components/appointment/appointment.jsx";
import api from "../../constants/api.js";
function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const isFocused = useIsFocused(); // Hook para verificar se a tela está ativa

  async function LoadAppointments() {
    try {
      const response = await api.get("/appointments");
      if (response.data) {
        setAppointments(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Aconteceu um erro no login. Tente mais tarde");
    }
  }

  function DeleteAppointments(id_appointment) {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este agendamento?",
      [
        {
          text: "Cancelar",
          style: "cancel", // Botão para cancelar a ação
        },
        {
          text: "Excluir",
          style: "destructive", // Indica que é uma ação perigosa
          onPress: async () => {
            try {
              const response = await api.delete(
                `/appointments/${id_appointment}`
              );
              if (response.data?.id_appointment) {
                Alert.alert("Sucesso", "Agendamento excluído com sucesso!");
                LoadAppointments(); // Atualiza a lista de agendamentos
              }
            } catch (error) {
              if (error.response?.data.error) {
                Alert.alert("Erro", error.response.data.error);
              } else {
                Alert.alert(
                  "Erro",
                  "Ocorreu um problema ao excluir o agendamento. Tente novamente."
                );
              }
            }
          },
        },
      ]
    );
  }

  useEffect(() => {
    if (isFocused) LoadAppointments(); // Carrega os agendamentos apenas quando a tela está ativa
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agende seus serviços.</Text>
      <FlatList
        data={appointments}
        keyExtractor={(appoint) => appoint.id_appointment}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Appointment
              id_appointment={item.id_appointment}
              service={item.service}
              doctor={item.doctor}
              specialty={item.specialty}
              booking_date={item.booking_date}
              booking_hour={item.booking_hour}
              onPress={DeleteAppointments}
            />
          );
        }}
      />
    </View>
  );
}

export default Calendar;
