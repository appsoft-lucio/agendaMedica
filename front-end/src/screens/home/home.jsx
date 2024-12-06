import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { styles } from "./home.style.js";
import Doctor from "../../components/doctor/doctor.jsx";
import api from "../../constants/api.js";

function Home(props) {
  const [doctors, setDoctors] = useState([]);

  function ClickDoctor(id_doctor, name, specialty, icon) {
    props.navigation.navigate("Services", {
      id_doctor,
      name,
      specialty,
      icon,
    });
  }

  async function LoadDoctors() {
    try {
      const response = await api.get("/doctors");
      if (response.data) setDoctors(response.data);
    } catch (error) {
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Aconteceu um erro no login. Tente mais tarde");
    }
  }

  useEffect(() => {
    LoadDoctors();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agende seus serviços.</Text>
      <FlatList
        data={doctors}
        keyExtractor={(doc) => doc.id_doctor}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Doctor
            id_doctor={item.id_doctor}
            name={item.name}
            icon={item.icon}
            specialty={item.specialty}
            onPress={ClickDoctor}
          />
        )}
      />
    </View>
  );
}

export default Home;
