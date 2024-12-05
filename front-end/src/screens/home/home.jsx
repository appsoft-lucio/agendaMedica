import React from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./home.style.js";
import { doctors } from "../../constants/data.js";
import Doctor from "../../components/doctor/doctor.jsx";

function Home(props) {
  function ClickDoctor(id_doctor, name, specialty, icon) {
    props.navigation.navigate("Services", {
      id_doctor,
      name,
      specialty,
      icon,
    });
  }

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
