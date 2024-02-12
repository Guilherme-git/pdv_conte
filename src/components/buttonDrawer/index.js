import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default () => {
    const navigation = useNavigation();

    return (
        <AntDesign     
            name="right"
            size={25}
            color="#fff" 
        />
    )
}