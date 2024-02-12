import { useState, useCallback } from "react";
import * as Style from "./style";
import { ScrollView, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import api from "../../service";

export default function Login() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    message: "",
  });

  useFocusEffect(
    useCallback(() => {
      const response = async () => {
        if ((await AsyncStorage.getItem("@app_conte_pdv")) !== null) {
          navigation.navigate("drawer");
        }
      };
      response();
    }, [])
  );

  const login = async () => {
    if (!usuario || !senha) {
      setAlert({
        open: true,
        title: "Atenção",
        message: "Preencha todas as informações",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/app/pdv/login", {
        usuario,
        senha,
      });

      const user = response.data.user;
      const business = response.data.business;
      const data = Object.assign(user, { business: business });
      
      await AsyncStorage.setItem("@app_conte_pdv", JSON.stringify(data));
      navigation.navigate("drawer");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        setAlert({
          open: true,
          title: "Atenção",
          message: error.response.data.message,
        });
      }
      return;
    }
    //navigation.navigate("drawer");
  };

  return (
    <Style.Container>
      <Style.Header
        colors={["#0066FF", "#115bff", "#4439ff"]}
        start={{ x: 0, y: 0 }}
      >
        <Style.Logo source={require("../../assets/logo/logo.jpg")} />
        <Style.TextLogin>Acessar</Style.TextLogin>
      </Style.Header>

      <AwesomeAlert
        show={alert.open}
        title={alert.title}
        message={alert.message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setAlert({
            open: false,
            title: "",
            message: "",
          });
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Style.ContainerForm>
          <Style.ContainerInput>
            <FontAwesome5
              name="user-alt"
              size={20}
              color="#9A9A9A"
              style={{ alignSelf: "center" }}
            />
            <Style.Input
              value={usuario}
              onChangeText={(t) => setUsuario(t)}
              placeholder="Informe seu usuário"
            />
          </Style.ContainerInput>

          <Style.ContainerInput>
            <FontAwesome5
              name="key"
              size={20}
              color="#9A9A9A"
              style={{ alignSelf: "center" }}
            />
            <Style.Input
              value={senha}
              onChangeText={(t) => setSenha(t)}
              secureTextEntry={showPassword ? false : true}
              placeholder="Informe sua senha"
            />
          </Style.ContainerInput>

          <Style.ContainerShowPassword>
            <Checkbox
              style={{ borderRadius: 5, borderColor: "#0066FF" }}
              value={showPassword}
              onValueChange={(value) => setShowPassword(value)}
              color={showPassword ? "#0066FF" : undefined}
            />
            <Style.ShowPassword>Mostrar senha</Style.ShowPassword>
          </Style.ContainerShowPassword>

          <Style.ContainerButton onPress={login} disabled={loading && true}>
            {loading ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Style.ContainerButtonText>Entrar</Style.ContainerButtonText>
            )}
          </Style.ContainerButton>
        </Style.ContainerForm>
      </ScrollView>
    </Style.Container>
  );
}
