import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient)`
    height: ${RFPercentage(40)}px;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 120px;
`;

export const Logo = styled.Image`
    width: ${RFValue(100)}px;
    height: ${RFValue(100)}px;
    border-radius: ${RFValue(10)}px;
`;

export const TextLogin = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
    color: #fff;
    margin: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
`;

export const ContainerForm = styled.View`
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
    margin: ${RFValue(40)}px;
    background-color: #fff;
    height: ${RFPercentage(50)}px;
    align-self: center;
    margin-top: ${RFValue(20)}px;
    border-radius: ${RFValue(8)}px;
`;

export const ContainerInput = styled.View`
    flex-direction: row;
    width: 100%;
    margin-bottom: ${RFValue(20)}px;
    padding-left: ${RFValue(10)}px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    border-radius: ${RFValue(8)}px;
`;  

export const Input = styled.TextInput`
    flex: 1;
    margin-left: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    height: ${RFValue(60)}px;
    padding: ${RFValue(10)}px;
`;

export const ContainerButton = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.COLORS.COR2};
    height: ${RFValue(40)}px;
    width: ${RFValue(150)}px;
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(8)}px;
    margin-top: ${RFValue(40)}px;
`;

export const ContainerButtonText = styled.Text`
    color: ${({theme}) => theme.COLORS.COR3};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size:  ${({theme}) => theme.FONT_SIZE.MD}px;
`;

export const ContainerShowPassword = styled.View`
    flex-direction: row;
    align-self: flex-start;
    align-items: center;
`;

export const ShowPassword = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD_ITALIC};
    color: ${({theme}) => theme.COLORS.COR1};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    margin-left: ${RFValue(8)}px;
`;