import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const TitleContainer = styled.Text`
    color: ${({theme}) => theme.COLORS.COR1};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size:  ${({theme}) => theme.FONT_SIZE.XL}px;
`;

export const SubTitleContainer = styled.Text`
    color: ${({theme}) => theme.COLORS.COR1};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR_ITALIC};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;
`;

export const ContainerCategorias = styled.View`
    background-color: ${({theme}) => theme.COLORS.COR3};
    height: ${RFValue(110)}px;
    margin: ${RFValue(10)}px;
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
`;

export const ContainerProdutos= styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.COR3};
    height: ${RFValue(120)}px;
    margin-left: ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;
    margin-bottom: ${RFValue(10)}px;
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
`;

export const CardCategoria = styled.TouchableOpacity`
    flex-direction: row;
    background-color:  ${({theme, selecionada}) => selecionada ? theme.COLORS.COR2 : theme.COLORS.COR4};
    margin-top: ${RFValue(10)}px;
    width: ${RFValue(200)}px;
    padding: ${RFValue(5)}px;
    border-radius: ${RFValue(8)}px;
    justify-content: center;
    align-items: center;
    margin-right: ${RFValue(8)}px;
`;

export const TitleCardCategoria = styled.Text`
    color: ${({theme, selecionada}) => selecionada ? theme.COLORS.COR3 : theme.COLORS.COR5};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;
`;

export const CardProduto = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.COLORS.COR1};
    margin-top: ${RFValue(10)}px;
    width: ${RFValue(100)}px;
    height: ${RFValue(120)}px;
    border-radius: ${RFValue(5)}px;
    justify-content: center;
    align-items: center;
    margin-right: ${RFValue(8)}px;
    justify-content: space-between;
`;

export const CardProdutoValor = styled.View`
    background-color: ${({theme}) => theme.COLORS.COR4};
    height: ${RFValue(30)}px;
    width: 100%;
    padding: ${RFValue(5)}px;
`;

export const CardProdutoValorText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;
`;

export const TitleCardProduto = styled.Text`
    color: ${({theme}) => theme.COLORS.COR3};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;
    padding: ${RFValue(5)}px;
`;

export const ContainerInput = styled.View`
    flex-direction: row;
    width: 100%;
    margin-bottom: ${RFValue(20)}px;
    margin-top: ${RFValue(10)}px;
    padding-left: ${RFValue(10)}px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    border-radius: ${RFValue(8)}px;
`; 

export const Search = styled.TextInput`
    flex: 1;
    margin-left: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    height: ${RFValue(40)}px;
    padding: ${RFValue(10)}px;
`;

export const LimparFiltros = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.COLORS.COR1};
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
`;

export const LimparFiltroText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.COR3};
`;
 
export const ContainerLinks = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: ${RFValue(10)}px;
`;

export const ButtonLink = styled.TouchableOpacity`
    background-color: ${({theme, status}) => status ? theme.COLORS.COR2 : theme.COLORS.COR4};
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(5)}px;
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
    border: none;
    padding: ${RFValue(5)}px;
    margin-right: ${RFValue(5)}px;
`;

export const ButtonLinkText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme, status}) => status ? theme.COLORS.COR3 : theme.COLORS.COR5};
`;

export const ContainerFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({theme}) => theme.COLORS.COR3};
    height: ${RFValue(50)}px;
    margin-bottom: ${RFValue(10)}px;
    margin-left: ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
`;

export const ContainerTotal = styled.View`
    background-color: ${({theme}) => theme.COLORS.EDEDED};
`;

export const TextTotal = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size:  ${({theme}) => theme.FONT_SIZE.XL}px;  
    margin: ${RFValue(10)}px;
`;

export const ContainerCarrinho = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.COR1};
    border-radius: ${RFValue(8)}px;
    width: ${RFValue(60)}px;
`;

