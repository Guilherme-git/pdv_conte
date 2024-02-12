import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient)`
    height: ${RFValue(60)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: ${RFValue(25)}px;
`;

export const ContainerIcon = styled.TouchableOpacity`
    margin-left: ${RFValue(20)}px;
    margin-top: ${RFValue(25)}px;;
    /* position: absolute;
    top: ${RFValue(25)}px;
    left: 0; */
`;

export const LimparFiltros = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.COLORS.COR3};
    justify-content: center;
    align-items: center;
    height: ${RFValue(30)}px;
    padding: ${RFValue(5)}px;
    border-radius: ${RFValue(8)}px;
    align-self: center;
    margin-top: ${RFValue(25)}px;;
`;

export const LimparFiltroText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size:  ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.COR2};
    height: ${RFValue(20)}px;
    text-align: center;
`;
