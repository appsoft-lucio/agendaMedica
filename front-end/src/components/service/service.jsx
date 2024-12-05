import React from "react";
import { Text, View } from "react-native";
import Button from "../button/button";

import { Styles } from "./service.style.js";

export default function Service(props) {
  return (
    <View style={Styles.service}>
      <View style={Styles.text}>
        <Text style={Styles.description}>{props.description}</Text>
        <Text style={Styles.price}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(props.price)}
        </Text>
      </View>
      <View style={Styles.containerButton}>
        <Button
          text="Agendar"
          onPress={() =>
            props.onPress(props.id_service, props.price, props.description)
          }
        ></Button>
      </View>
    </View>
  );
}
