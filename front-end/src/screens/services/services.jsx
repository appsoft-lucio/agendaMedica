import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, View } from "react-native";
import { styles } from "./services.style.js";
import icon from "../../constants/icon.js";

import Service from "../../components/service/service.jsx";
import api from "../../constants/api.js";

function Services(props) {
  const id_doctor = props.route.params.id_doctor;
  const name = props.route.params.name;
  const specialty = props.route.params.specialty;
  const iconDoctor = props.route.params.icon;

  const [doctorsServices, setDoctorsServices] = useState([]);

  function ClickService(id_service) {
    props.navigation.navigate("Schedule", {
      id_doctor,
      id_service,
    });
  }
  async function LoadServices() {
    try {
      const response = await api.get("/doctors/" + id_doctor + "/services");
      if (response.data) {
        setDoctorsServices(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Aconteceu um erro no login. Tente mais tarde");
    }
  }

  useEffect(() => {
    LoadServices();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={iconDoctor == "M" ? icon.male : icon.female} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>
      <FlatList
        data={doctorsServices}
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