import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./appointment.style.js";
import icon from "../../constants/icon.js";
import Button from "../../components/button/button.jsx";

function Appointment(props) {
  const dt = new Date(props.booking_date + "T" + props.booking_hour);

  return (
    <View style={styles.appointment}>
      <Text style={styles.name}>
        {props.service} - {props.doctor}
      </Text>
      <Text style={styles.specialty}>{props.specialty}</Text>
      <View style={styles.container}>
        <View style={styles.containerBooking}>
          <View style={styles.booking}>
            <Image style={styles.icon} source={icon.calendar_orange} />
            <Text style={styles.bookingDate}>{dt.toLocaleDateString()}</Text>
          </View>
          <View style={styles.booking}>
            <Image style={styles.icon} source={icon.clock_orange} />
            <Text style={styles.bookingHour}>{props.booking_hour}</Text>
          </View>
        </View>

        <View style={styles.containerButton}>
          <Button
            text={"Cancelar Reserva"}
            theme="danger"
            onPress={() => {
              props.onPress(props.id_appointment);
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Appointment;
