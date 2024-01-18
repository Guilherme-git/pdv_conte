import { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Style from "./style";
import Header from "../../components/header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import api from "../../service";

const categorias = [
  {
    id: 1,
    nome: "Esportes e atividades ao ar livre",
  },
  {
    id: 2,
    nome: "Eletrônicos",
  },
  {
    id: 3,
    nome: "Roupas e acessórios",
  },
  {
    id: 4,
    nome: "Beleza e cuidados pessoais",
  },
  {
    id: 5,
    nome: "Alimentos e bebidas",
  },
  {
    id: 6,
    nome: "Brinquedos e jogos",
  },
  {
    id: 7,
    nome: "Saúde e bem-estar",
  },
  {
    id: 8,
    nome: "Alimentos e bebidas",
  },
  {
    id: 9,
    nome: "Brinquedos e jogos",
  },
  {
    id: 10,
    nome: "Saúde e bem-estar",
  },
];

export default function Home() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [produtosLista, setProdutosLista] = useState([]);
  const [produtosListaBackup, setProdutosListaBackup] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageAtual, setPageAtual] = useState(1);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState({
    id: "",
    nome: "",
  });
  const [pesquisaProduto, setPesquisaProduto] = useState("");

  useFocusEffect(
    useCallback(() => {
      const response = async () => {
        if ((await AsyncStorage.getItem("@app_conte_pdv")) !== null) {
          setLoadingCategorias(true);
          setLoadingProdutos(true);
          const userLogado = JSON.parse(
            await AsyncStorage.getItem("@app_conte_pdv")
          );
          setUsuario(userLogado);

          const dados = await api.get(
            `/app/pdv/categorias/listar?business=${userLogado.business.id}`
          );
          setCategorias(dados.data);
          setLoadingCategorias(false);

          setLoadingProdutos(true);
          const dados2 = await api.get(
            `/app/pdv/produtos/listar-todos?business=${userLogado.business.id}`
          );
          setProdutosLista(dados2.data);
          setProdutosListaBackup(dados2.data);
          setLoadingProdutos(false);
        }
      };
      response();
    }, [])
  );

  useEffect(() => {
    if (pesquisaProduto == "") {
      setProdutosLista(produtosListaBackup);
    } else {
      setProdutosLista(
        produtosListaBackup.filter((product) => {
          if (product.name.toLowerCase().indexOf(pesquisaProduto.toLowerCase()) > -1 ) {
            return true
          } else {
            return false
          }
        })
      );
    }
  }, [pesquisaProduto]);

  useEffect(() => {
    if (!categoriaSelecionada.id) {
      setProdutosLista(produtosListaBackup);
    } else {
      setProdutosLista(
        produtosListaBackup.filter((product) => {
          if (product.category_id == categoriaSelecionada.id) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [categoriaSelecionada]);

  const selecionarCategoria = (id, nome) => {
    setCategoriaSelecionada({ id: id, nome: nome });
  };

  const limparFiltros = async () => {
    setCategoriaSelecionada({ id: "", nome: "" });
    setPesquisaProduto("")
    setProdutosLista(produtosListaBackup)
  };


  return (
    <Style.Container>
      <Header />
      <Style.ContainerCategorias>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Style.TitleContainer>Categorias</Style.TitleContainer>
          {categoriaSelecionada.id && (
            <Style.LimparFiltros onPress={limparFiltros}>
              <Style.LimparFiltroText>Limpar filtros</Style.LimparFiltroText>
            </Style.LimparFiltros>
          )}
        </View>

        {loadingCategorias ? (
          <ActivityIndicator
            size={24}
            color={"#4439ff"}
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categorias}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              categoriaSelecionada.id == item.id ? (
                <Style.CardCategoria
                  key={item.id}
                  selecionada={true}
                  onPress={() => selecionarCategoria(item.id, item.name)}
                >
                  <Style.TitleCardCategoria selecionada={true}>
                    {item.name}
                  </Style.TitleCardCategoria>
                </Style.CardCategoria>
              ) : (
                <Style.CardCategoria
                  selecionada={false}
                  onPress={() => selecionarCategoria(item.id, item.name)}
                >
                  <Style.TitleCardCategoria selecionada={false}>
                    {item.name}
                  </Style.TitleCardCategoria>
                </Style.CardCategoria>
              )
            }
          />
        )}
      </Style.ContainerCategorias>

      <Style.ContainerProdutos>
        <Style.TitleContainer>Produtos</Style.TitleContainer>
        {categoriaSelecionada.id && (
          <Style.SubTitleContainer>
            {categoriaSelecionada.nome}
          </Style.SubTitleContainer>
        )}

        <View style={{ flex: 1, alignItems: "center" }}>
          <Style.ContainerInput>
            <AntDesign
              name="search1"
              size={25}
              color="black"
              style={{ alignSelf: "center" }}
            />
            <Style.Search
              value={pesquisaProduto}
              onChangeText={(t) => setPesquisaProduto(t)}
              placeholder="Pesquisar produto"
            />
          </Style.ContainerInput>

          {loadingProdutos ? (
            <ActivityIndicator
              size={24}
              color={"#4439ff"}
              style={{ marginTop: 20 }}
            />
          ) : (
            <FlatList
              numColumns={"3"}
              showsVerticalScrollIndicator={false}
              data={produtosLista}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Style.CardProduto>
                  <Style.CardProdutoValor>
                    <Style.CardProdutoValorText>
                      {item.variations[0] != undefined &&
                        "R$ " + item.variations[0].sell_price_inc_tax}
                    </Style.CardProdutoValorText>
                  </Style.CardProdutoValor>
                  <ScrollView scrollEnabled={true} nestedScrollEnabled={true}>
                    <Style.TitleCardProduto>{item.name}</Style.TitleCardProduto>
                  </ScrollView>
                </Style.CardProduto>
              )}
            />
          )}
        </View>
      </Style.ContainerProdutos>

      <Style.ContainerFooter>
        <Style.ContainerTotal>
          <Style.TextTotal>R$ 0.0</Style.TextTotal>
        </Style.ContainerTotal>

        <Style.ContainerCarrinho>
          <Entypo name="shopping-cart" size={24} color="#fff" />
        </Style.ContainerCarrinho>
      </Style.ContainerFooter>
    </Style.Container>
  );
}
