import React from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./calendar.style.js";
import { appointments } from "../../constants/data.js";
import Appointment from "../../components/appointment/appointment.jsx";
import icon from "../../constants/icon.js";

function Calendar() {
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
              service={item.service}
              doctor={item.doctor}
              specialty={item.specialty}
              booking_date={item.booking_date}
              booking_hour={item.booking_hour}
            />
          );
        }}
      />
    </View>
  );
}

export default Calendar;
