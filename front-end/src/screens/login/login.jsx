import React, { useContext, useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import icon from "../../constants/icon.js";
import { styles } from "./login.style";
import Button from "../../components/button/button.jsx";
import api from "../../constants/api.js";
import { AuthContext } from "../../contexts/auth.js";

function Login(props) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function ExecuteLogin() {
    if (!email || !password) {
      return Alert.alert("Preencha todos os campos.");
    }

    setLoading(true); // Mostra carregamento
    try {
      const response = await api.post("/users/login", { email, password });

      if (response.data?.token) {
        api.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        setUser(response.data);
      } else {
        Alert.alert("Erro ao autenticar. Tente novamente.");
      }
    } catch (error) {
      if (error.response?.data.error) Alert.alert(error.response?.data.error);
      else Alert.alert("Aconteceu um erro no login. Tente mais tarde");
    } finally {
      setLoading(false); // Finaliza carregamento
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={icon.logo} style={styles.logo} />
      </View>

      <View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(texto) => setEmail(texto)}
          />
        </View>

        <View style={styles.containerInput}>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry={!showPassword} // Alterna visibilidade
            onChangeText={(texto) => setPassword(texto)}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icon.olho : icon.olho_fechado}
              style={styles.olhoIcon} // Certifique-se de definir um estilo adequado
            />
          </TouchableOpacity>
        </View>

        <Button
          text={loading ? <ActivityIndicator color="#FFF" /> : "Acessar"}
          onPress={ExecuteLogin}
          disabled={loading}
        />
      </View>

      <View style={styles.footer}>
        <Text>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Account")}>
          <Text style={styles.footerLink}>Criar conta agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
