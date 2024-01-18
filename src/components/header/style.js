import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient)`
    height: ${RFValue(90)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
`;

export const ContainerIcon = styled.TouchableOpacity`
    margin-left: ${RFValue(20)}px;
    position: absolute;
    bottom: ${RFValue(20)}px;
    left: 0;
`;