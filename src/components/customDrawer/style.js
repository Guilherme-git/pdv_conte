import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient)`
    flex: 1;
    background-color: #fff;
`;

export const Footer = styled.View`
    height: ${RFValue(100)}px;
    padding: ${RFValue(15)}px;
`;

export const BtnSair = styled.TouchableOpacity`
    width: ${RFValue(60)}px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const TextBtnSair = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.COLORS.COR_MENU_ATIVO};
`;

export const TextVersao = styled.Text`
    color: ${({theme}) => theme.COLORS.COR_MENU_DESATIVO};
    margin-top: ${RFValue(15)}px;
`;

export const ContainerInfoUser = styled.TouchableOpacity`
    margin-top: ${RFValue(20)}px;
    margin-bottom: ${RFValue(20)}px;
    padding: ${RFValue(10)}px;
    padding-left: ${RFValue(20)}px;
`;

export const NomeUser = styled.Text`
    align-self: flex-start;
    margin-top: ${RFValue(10)}px;
    color: ${({theme}) => theme.COLORS.COR_MENU_ATIVO};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
`;

export const ImageUser = styled.Image`
    align-self: flex-start;
    height: ${RFValue(60)}px;
    width: ${RFValue(60)}px;
    border-radius: ${RFValue(15)}px;
    border-radius: ${RFPercentage(50)}px;
`;

export const ContainerList = styled.View`
    margin-left: ${RFValue(5)}px;
    margin-right: ${RFValue(5)}px;
    margin-bottom: ${RFValue(50)}px;
`;