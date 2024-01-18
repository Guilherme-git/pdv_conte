import React, { useEffect, useState, useCallback } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect, DrawerActions } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Footer,
  ImageUser,
  ContainerInfoUser,
  NomeUser,
  ContainerList,
  BtnSair,
  TextBtnSair,
  TextVersao,
} from "./style";

export default (props) => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

 

useFocusEffect(
  useCallback(() => {
    const response = async () => {
      if ((await AsyncStorage.getItem("@app_conte_pdv")) !== null) {
        const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte_pdv"));
        setUsuario(userLogado)
      } else {
        navigation.navigate("login");
      }
    };
    response();
  }, [])
);

  const sair = async () => {
    await AsyncStorage.removeItem("@app_conte_pdv")
    navigation.dispatch(DrawerActions.closeDrawer()), navigation.navigate('login')
  }

  return (
    <Container
    colors={["#0066FF", "#115bff","#4439ff"]}
      start={{ x: 0, y: 0 }}
    >
      <DrawerContentScrollView {...props}>
        <ContainerInfoUser>
          <ImageUser
            resizeMode="contain"
            source={{
              uri: `http://app.contetecnologia.com.br/uploads/business_logos/${usuario?.business?.logo}`
            }}
          />
          <NomeUser>{usuario?.first_name+" "+usuario?.last_name}</NomeUser>
        </ContainerInfoUser>

        <ContainerList>
          <DrawerItemList {...props} />
        </ContainerList>
      </DrawerContentScrollView>

      <Footer>
        <BtnSair onPress={sair}>
          <AntDesign name="logout" size={18} color="#F2F2F2" />
          <TextBtnSair>Sair</TextBtnSair>
        </BtnSair>

        <TextVersao>1.0</TextVersao>
      </Footer>
    </Container>
  );
};
