import { useState } from "react";
import * as Style from "./style";
import ButtonDrawer from "../buttonDrawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import {
  Entypo,

} from "@expo/vector-icons";

export default function Header({ type, categoriaSelecionada, ...props }) {
  const navigation = useNavigation();

  return (
    <Style.Container
      colors={["#4439ff", "#4439ff", "#4439ff"]}
      start={{ x: 0, y: 0 }}
    >
      <Style.ContainerIcon
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <ButtonDrawer />
      </Style.ContainerIcon>

      {categoriaSelecionada.id && (
        <Style.LimparFiltros {...props}>
          <Style.LimparFiltroText>Limpar filtros</Style.LimparFiltroText>
        </Style.LimparFiltros>
      )}

    </Style.Container>
  );
}
