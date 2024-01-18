import { useState } from "react";
import * as Style from "./style";
import ButtonDrawer from "../buttonDrawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function Header({ type }) {
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
    </Style.Container>
  );
}
