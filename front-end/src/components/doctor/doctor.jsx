import { Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "./doctor.style";
import icon from "../../constants/icon";

function Doctor(props) {
  return (
    <TouchableOpacity
      style={style.doctor}
      onPress={() =>
        props.onPress(props.id_doctor, props.name, props.specialty, props.icon)
      }
    >
      <Image
        source={props.icon == "M" ? icon.male : icon.female}
        style={style.icon}
      />
      <View>
        <Text style={style.name}>{props.name}</Text>
        <Text style={style.speciality}>{props.specialty}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Doctor;
