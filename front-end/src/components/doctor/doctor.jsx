import { Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "./doctor.style";

export default function Doctor(props) {
  return (
    <TouchableOpacity style={style.doctor}>
      <Image source={props.icon} style={style.icon} />
      <View>
        <Text style={style.name}>{props.name}</Text>
        <Text style={style.speciality}>{props.specialty}</Text>
      </View>
    </TouchableOpacity>
  );
}
