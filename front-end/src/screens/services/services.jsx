import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./services.style.js";
import { doctors_services } from "../../constants/data.js";
import icon from "../../constants/icon.js";

import Service from "../../components/service/service.jsx";

function Services(props) {
  const id_doctor = props.route.params.id_doctor;
  const name = props.route.params.name;
  const specialty = props.route.params.specialty;
  const iconDoctor = props.route.params.icon;

  function ClickService(id_service) {
    props.navigation.navigate("Schedule", {
      id_doctor,
      id_service,
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={iconDoctor == "M" ? icon.male : icon.female} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>
      <FlatList
        data={doctors_services}
        keyExtractor={(serv) => serv.id_service}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Service
              id_service={item.id_service}
              description={item.description}
              price={item.price}
              onPress={ClickService}
            />
          );
        }}
      />
    </View>
  );
}

export default Services;
