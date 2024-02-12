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
    font-size:  ${({theme}) => theme.FONT_SIZE.MD}px;
`;

export const SubTitleContainer = styled.Text`
    color: ${({theme}) => theme.COLORS.COR1};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR_ITALIC};
    font-size:  ${({theme}) => theme.FONT_SIZE.MD}px;
`;

export const ContainerCategorias = styled.View`
    background-color: ${({theme}) => theme.COLORS.COR3};
    height: ${RFValue(40)}px;
    margin: ${RFValue(10)}px;
    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
`;

export const ContainerProdutos= styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.COR3};
    height: ${RFValue(120)}px;
    /* margin-left: ${RFValue(5)}px;
    margin-right: ${RFValue(5)}px; */
    margin-bottom: ${RFValue(10)}px;
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
`;

export const CardCategoria = styled.TouchableOpacity`
    flex-direction: row;
    background-color:  ${({theme, selecionada}) => selecionada ? theme.COLORS.COR2 : theme.COLORS.COR4};
    margin-top: ${RFValue(5)}px;
    margin-bottom: ${RFValue(5)}px;
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
    margin-top: ${RFValue(5)}px;
    width: ${RFValue(100)}px;
    border-radius: ${RFValue(5)}px;
    justify-content: center;
    padding-left: ${RFValue(5)}px;
    padding-right: ${RFValue(5)}px;
    margin-right: ${RFValue(2)}px;
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
export const TitleCardValorProduto = styled.Text`
    color: ${({theme}) => theme.COLORS.COR3};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.COLORS.COR4};
    width: "100%";
`;

export const TitleCardProduto = styled.Text`
    color: ${({theme}) => theme.COLORS.COR3};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.SM}px;

`;

export const ContainerInput = styled.View`
    flex-direction: row;
    width: 100%;
    margin-top: ${RFValue(10)}px;
    padding-left: ${RFValue(10)}px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    border-radius: ${RFValue(8)}px;
    height: ${RFValue(25)}px;
    margin-bottom:  ${RFValue(5)}px;
`; 

export const Search = styled.TextInput`
    flex: 1;
    margin-left: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    height: ${RFValue(40)}px;
    padding: ${RFValue(10)}px;
    align-self: center;
`;

export const LimparFiltros = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.COLORS.COR1};
    justify-content: center;
    align-items: center;
    height: ${RFValue(20)}px;
    padding: ${RFValue(5)}px;
    border-radius: ${RFValue(8)}px;
`;

export const LimparFiltroText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.COR3};
    height: ${RFValue(20)}px;
    text-align: center;
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
    height: ${RFValue(30)}px;
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
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;  
    margin: ${RFValue(5)}px;
    margin-left: ${RFValue(10)}px;
`;

export const ContainerCarrinho = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.COR1};
    border-radius: ${RFValue(8)}px;
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
`;

export const ContentDescriptionModal = styled.View`
    background-color: #f5f5f5;
    height: ${RFValue(400)}px;
    margin-top: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
    padding: ${RFValue(10)}px;
`;

export const ContentDescriptionHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(5)}px;
`;

export const ContentDescriptionText = styled.Text`
    align-self: center;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;  

`;

export const Divider = styled.View`
    background-color: #696969;
    height: 1px;
`;

export const ContentDescriptionBody = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(5)}px;
    margin-top: ${RFValue(10)}px;
`;

export const ContentDescriptionBodyText = styled.Text`
    font-weight: bold;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;  
`;

export const BtnPagamento = styled.TouchableOpacity`
    height: ${RFValue(40)}px;
    border-radius: ${RFValue(8)}px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${RFValue(20)}px;
`;

export const BtnPagamentoText = styled.Text`
    color: #fff;
    font-size: ${RFValue(18)}px;
`;

export const ContentDescriptionListProduct = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(2)}px;
`;

export const ContentDescriptionListProductText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size:  ${({theme}) => theme.FONT_SIZE.LG}px;  
`;
