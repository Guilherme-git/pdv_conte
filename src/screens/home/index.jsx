import { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import * as Style from "./style";
import Header from "../../components/header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import api from "../../service";
import AwesomeAlert from "react-native-awesome-alerts";
import Modal from "react-native-modal";
import Dialog from "react-native-dialog";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { WebView } from "react-native-webview";
import CONST from "../../consts/index";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function Home() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [loadingPagamento, setLoadingPagamento] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  const [produtosLista, setProdutosLista] = useState([]);
  const [produtosListaBackup, setProdutosListaBackup] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageAtual, setPageAtual] = useState(1);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState({
    id: "",
    nome: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    message: "",
    type: 1,
  });
  const [pesquisaProduto, setPesquisaProduto] = useState("");
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);
  const [totalCarrinhoDesconto, setTotalCarrinhoDesconto] = useState(0);
  const [modalCarrinho, setModalCarrinho] = useState(false);
  const [modalImprimir, setModalImprimir] = useState(false);
  const [descontoDialog, setDescontoDialog] = useState(false);
  const [metodoPagamentoDialog, setMetodoPagamentoDialog] = useState(false);
  const [clientesDialog, setClientesDialog] = useState(false);
  const [desconto, setDesconto] = useState();
  const [metodoPagamento, setMetodoPagamento] = useState("cash");
  const [rotacaoTela, setRotacaoTela] = useState(1)
  const dollarMask = createNumberMask({
    delimiter: "",
    separator: ".",
    precision: 2,
  });

  useFocusEffect(
    useCallback(() => {
      Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        if (width < height) {
          setRotacaoTela(1)
        } else {
          setRotacaoTela(2)
        }
      })

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

          const dados3 = await api.get(
            `/app/pdv/cliente/listar?business_id=${userLogado.business.id}&owner_id=${userLogado.id}`
          );

          setClientes(dados3.data);
          for (let i = 0; i < dados3.data.length; i++) {
            const element = dados3.data[i];

            setClienteSelecionado({
              id: element.id,
              name: element.name
            });

            break;
          }
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
          if (
            product.name.toLowerCase().indexOf(pesquisaProduto.toLowerCase()) >
            -1
          ) {
            return true;
          } else {
            return false;
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
    setPesquisaProduto("");
    setProdutosLista(produtosListaBackup);
  };

  const addProduto = (id, nome, preco) => {
    const index = produtosCarrinho.findIndex((item) => item.id == id);
    if (index == -1) {
      setProdutosCarrinho([
        ...produtosCarrinho,
        { id: id, nome: nome, preco: preco, quantidade: 1 },
      ]);
      const total = Number(totalCarrinho) + Number(preco);
      setTotalCarrinho(total);
      setTotalCarrinhoDesconto(total);
    } else {
      const array_item = produtosCarrinho[index];
      const array_sup = [...produtosCarrinho];
      array_sup.splice(index, 1);

      array_sup.push({
        id: array_item["id"],
        nome: array_item["nome"],
        preco: array_item["preco"],
        quantidade: Number(array_item["quantidade"]) + Number(1),
      });

      const total = Number(totalCarrinho) + Number(array_item["preco"]);
      setTotalCarrinho(total);
      setTotalCarrinhoDesconto(total);
      setProdutosCarrinho(array_sup);
    }
    Toast.show({
      type: "success",
      text1: "Produto adicionado",
      text2: "O produto foi adicionado no carrinho!",
      visibilityTime: 2000,
    });

    setAlert({
      open: false,
      title: "",
      message: "",
      type: 1,
    });
  };

  const abrirCarrinho = () => {
    if (produtosCarrinho.length <= 0) {
      setAlert({
        open: true,
        title: "Nenhum produto",
        message: "Adicione pelo menos um produto no carrinho",
        type: 1,
      });
      return;
    }
    setModalCarrinho(true);
  };

  const fecharModalConfirmaPagamento = () => {
    setDesconto(null);
    setTotalCarrinhoDesconto(totalCarrinho);
    setModalCarrinho(false);
  };

  const aplicarDesconto = () => {
    const total = Number(totalCarrinhoDesconto) - Number(desconto);

    if (!desconto) {
      setDescontoDialog(false);
      return setTotalCarrinhoDesconto(totalCarrinho);
    }
    if (total < 0) {
      setDescontoDialog(false);
      return setTotalCarrinhoDesconto(0);
    }
    setTotalCarrinhoDesconto(total);
    setDescontoDialog(false);

    Toast.show({
      type: "success",
      text1: "Desconto aplicado",
      text2: "O desconto foi aplicado na compra!",
      visibilityTime: 2000,
    });
  };

  const removerDesconto = () => {
    setTotalCarrinhoDesconto(totalCarrinho);
    setDescontoDialog(false);
    setDesconto(null);

    Toast.show({
      type: "success",
      text1: "Desconto removido",
      text2: "O desconto foi removido da compra!",
      visibilityTime: 2000,
    });
  };

  const removerProduto = (item) => {
    const index = produtosCarrinho.findIndex(
      (produto) => produto.id == item.id
    );
    const array_sup = [...produtosCarrinho];
    array_sup.splice(index, 1);

    const totalDesconto =
      Number(totalCarrinhoDesconto) -
      Number(item.preco) * Number(item.quantidade);
    setTotalCarrinho(totalDesconto);
    setTotalCarrinhoDesconto(totalDesconto);
    setProdutosCarrinho(array_sup);

    if (array_sup.length <= 0) {
      setModalCarrinho(false);
    }

    Toast.show({
      type: "success",
      text1: "Produto removido",
      text2: "O produto foi removido do carrinho!",
      visibilityTime: 2000,
    });
  };

  const pagamento = async () => {
    if (!clienteSelecionado?.id) {
      setAlert({
        open: true,
        title: "Nenhum cliente",
        message: "Selecione pelo menos um cliente para continuar",
        type: 1,
      });
      return;
    }

    try {
      setLoadingPagamento(true);
      const response = await api.post("/app/pdv/venda/cadastrar", {
        total: totalCarrinhoDesconto,
        metodoPagamento,
        produtos: produtosCarrinho,
        cliente: clienteSelecionado.id,
        usuario,
      });

      if (response.data.message == "Venda cadastrada") {
        setAlert({
          open: true,
          title: "Venda realizada",
          message: "Deseja imprimir o cupom fiscal ?",
          cancelButton: true,
          type: 2,
        });
        Toast.show({
          type: "success",
          text1: "Venda realizada",
          text2: "Sua venda foi cadastrada com sucesso!",
          visibilityTime: 5000,
        });
      }
      fecharModalConfirmaPagamento();
      setTotalCarrinho(0);
      setTotalCarrinhoDesconto(0);
      setProdutosCarrinho([]);
      setLoadingPagamento(false);
    } catch (error) {
      setAlert({
        open: true,
        title: "Ocorreu um erro",
        message: "Ocorreu um problema, tente novamente mais tarde!",
        colorButton: "#DD6B55",
      });
      setLoadingPagamento(false);
    }
  };

  const imprimirNFCE = async () => {
    // const response = await api.get(`/app/pdv/venda/imprimir?business_id=${usuario.business.id}`);
    // console.log(response.data)
    setAlert({
      open: true,
      title: "Carregando NFC-e...",
      message: "Aguarde um momento até o carregamento ser concluído",
      type: 1,
      cancelButton: false,
    });

    const filename = "NFCe.pdf";
    const result = await FileSystem.downloadAsync(
      `https://app.contetecnologia.com.br/public/api/app/pdv/venda/imprimir?business_id=${usuario.business.id}`,
      FileSystem.documentDirectory + filename
    );
    setAlert({
      open: false,
      title: "",
      message: "",
      type: 1,
    });
    console.log(result.uri)
    shareAsync(result.uri);


  };

  const imprimirCupom = async () => {
    // const response = await api.get(`/app/pdv/venda/imprimir-cupom?business_id=${usuario.business.id}`);
    // return console.log(response.data)
    setAlert({
      open: true,
      title: "Carregando Cupom...",
      message: "Aguarde um momento até o carregamento ser concluído",
      type: 1,
      cancelButton: false,
    });

    const filename = "Cupom.pdf";
    const result = await FileSystem.downloadAsync(
      `https://app.contetecnologia.com.br/public/api/app/pdv/venda/imprimir-cupom?business_id=${usuario.business.id}`,
      FileSystem.documentDirectory + filename
    );
    setAlert({
      open: false,
      title: "",
      message: "",
    });
    console.log(result.uri)
    shareAsync(result.uri);
  };


  return (
    <Style.Container>
      <Header onPress={limparFiltros} categoriaSelecionada={categoriaSelecionada} />
      <Toast />

      {alert.type == 1 && (
        <AwesomeAlert
          show={alert.open}
          title={alert.title}
          message={alert.message}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlert({
              open: false,
              title: "",
              message: "",
            });
          }}
        />
      )}
      {alert.type == 2 && (
        <AwesomeAlert
          show={alert.open}
          title={alert.title}
          message={alert.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          showCancelButton={alert.cancelButton}
          confirmText="Imprimir cupom"
          cancelText={"Imprimir NFC-e"}
          confirmButtonColor="#DD6B55"
          cancelButtonColor="#4439ff"
          onConfirmPressed={imprimirCupom}
          onCancelPressed={imprimirNFCE}
        />
      )}

      <Style.ContainerCategorias>
        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Style.TitleContainer>Categorias</Style.TitleContainer>
          {categoriaSelecionada.id && (
            <Style.LimparFiltros onPress={limparFiltros}>
              <Style.LimparFiltroText>Limpar filtros</Style.LimparFiltroText>
            </Style.LimparFiltros>
          )}
        </View> */}

        {loadingCategorias ? (
          <ActivityIndicator
            size={24}
            color={"#4439ff"}
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
          horizontal={false}
          numColumns={"9"}
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
        <ScrollView
          horizontal={false}
          nestedScrollEnabled={true}
          scrollEnabled={true}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Style.TitleContainer>Produtos - {"R$ " + totalCarrinho} </Style.TitleContainer>
              {categoriaSelecionada.id && (
                <Style.SubTitleContainer>
                  {categoriaSelecionada.nome}
                </Style.SubTitleContainer>
              )}
            </View>

            <Style.ContainerCarrinho onPress={abrirCarrinho}>
              <Entypo name="shopping-cart" size={24} color="#fff" />
            </Style.ContainerCarrinho>
          </View>


          <View style={{ flex: 1, alignItems: "center" }}>
            <Style.ContainerInput>
              <AntDesign
                name="search1"
                size={20}
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
              rotacaoTela == 1 ?
                <FlatList
                  key={"1"}
                  nestedScrollEnabled={true}
                  scrollEnabled={false}
                  numColumns={"6"}
                  showsVerticalScrollIndicator={false}
                  data={produtosLista}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Style.CardProduto
                      onPress={() =>
                        addProduto(
                          item.id,
                          item.name,
                          item.variations[0].sell_price_inc_tax
                        )
                      }
                    >
                      <ScrollView
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                      >
                        <Style.TitleCardValorProduto>
                          {"R$ " + item.variations[0].sell_price_inc_tax}
                        </Style.TitleCardValorProduto>

                        <Style.TitleCardProduto>
                          {item.name}
                        </Style.TitleCardProduto>
                      </ScrollView>
                    </Style.CardProduto>
                  )}
                />
                :
                <FlatList
                  key={"2"}
                  nestedScrollEnabled={true}
                  scrollEnabled={false}
                  numColumns={"6"}
                  showsVerticalScrollIndicator={false}
                  data={produtosLista}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (

                    <Style.CardProduto
                      onPress={() =>
                        addProduto(
                          item.id,
                          item.name,
                          item.variations[0].sell_price_inc_tax
                        )
                      }
                    >
                      <ScrollView
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                      >
                        <Style.TitleCardValorProduto>
                          {"R$ " + item.variations[0].sell_price_inc_tax}
                        </Style.TitleCardValorProduto>

                        <Style.TitleCardProduto>
                          {item.name}
                        </Style.TitleCardProduto>
                      </ScrollView>
                    </Style.CardProduto>

                  )}
                />
            )}
          </View>
        </ScrollView>
      </Style.ContainerProdutos>

      {/* <Modal isVisible={modalImprimir} onBackdropPress={() => setModalImprimir(false)}>
        <View style={{ height: "90%", width: "100%" }}>
          <WebView
            originWhitelist={["*"]}
            source={{
              uri: CONST.URL+"/app/pdv/venda/imprimir?business_id="+usuario?.business.id,
            }}
          />
        </View>
      </Modal> */}

      <Modal isVisible={modalCarrinho}>
        <Style.ContentDescriptionModal>
          <AntDesign
            onPress={fecharModalConfirmaPagamento}
            name="close"
            size={34}
            color="#000"
            style={{ alignSelf: "flex-end", marginBottom: 10 }}
          />

          <Style.ContentDescriptionHeader>
            <Style.ContentDescriptionText>
              Forma de pagamento:
            </Style.ContentDescriptionText>
            <View style={{ flexDirection: "row" }}>
              <Style.ContentDescriptionText>
                {metodoPagamento == "cash"
                  ? "Dinheiro"
                  : metodoPagamento == "card"
                    ? "Cartão de crédito"
                    : "Pix"}
              </Style.ContentDescriptionText>
              <MaterialIcons
                onPress={() => setMetodoPagamentoDialog(true)}
                name="add-box"
                size={40}
                color="green"
                style={{ marginLeft: 5, alignSelf: "center" }}
              />
            </View>
          </Style.ContentDescriptionHeader>

          <Style.ContentDescriptionHeader>
            <Style.ContentDescriptionText>
              Cliente:
            </Style.ContentDescriptionText>
            <View style={{ flexDirection: "row" }}>
              <Style.ContentDescriptionText>
                {clienteSelecionado?.name}
              </Style.ContentDescriptionText>
              <MaterialIcons
                onPress={() => setClientesDialog(true)}
                name="add-box"
                size={40}
                color="green"
                style={{ marginLeft: 5, alignSelf: "center" }}
              />
            </View>
          </Style.ContentDescriptionHeader>

          <Style.ContentDescriptionHeader>
            <Style.ContentDescriptionText style={{ fontWeight: "bold" }}>
              Desconto na venda:{" "}
            </Style.ContentDescriptionText>
            <View style={{ flexDirection: "row" }}>
              <Style.ContentDescriptionText>
                - R$ {desconto ? desconto : "0.00"}{" "}
              </Style.ContentDescriptionText>
              <MaterialIcons
                onPress={() => setDescontoDialog(true)}
                name="add-box"
                size={40}
                color="red"
                style={{ marginLeft: 5, alignSelf: "center" }}
              />
            </View>
          </Style.ContentDescriptionHeader>

          <Dialog.Container visible={descontoDialog}>
            <Dialog.Title>
              informe o valor - R$ {desconto ? desconto : "0.00"}
            </Dialog.Title>
            <Dialog.Description>
              Informe o valor para ser descontado
            </Dialog.Description>
            <MaskInput
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 5,
                padding: 10,
                height: 40,
                marginBottom: 10,
                width: "100%",
              }}
              mask={dollarMask}
              value={desconto}
              onChangeText={(t) => setDesconto(t)}
              placeholder="Digite aqui o valor R$"
              keyboardType={"number-pad"}
            />
            <Dialog.Button label="Remover desconto" onPress={removerDesconto} />
            <Dialog.Button label="Aplicar" onPress={aplicarDesconto} />
          </Dialog.Container>

          <Dialog.Container visible={metodoPagamentoDialog}>
            <Dialog.Title>Escolha o método de pagamento</Dialog.Title>
            <Dialog.Description>Selecione abaixo</Dialog.Description>
            <Picker
              selectedValue={metodoPagamento}
              onValueChange={(itemValue, itemIndex) =>
                setMetodoPagamento(itemValue)
              }
            >
              <Picker.Item label="Dinheiro" value="cash" />
              <Picker.Item label="Cartão de credito" value="card" />
              <Picker.Item label="Pix" value="pix" />
            </Picker>
            <Dialog.Button
              label="Fechar"
              onPress={() => setMetodoPagamentoDialog(false)}
            />
          </Dialog.Container>

          <Dialog.Container visible={clientesDialog}>
            <Dialog.Title>Escolha um clientes</Dialog.Title>
            <Dialog.Description>Selecione abaixo</Dialog.Description>
            <Picker
              selectedValue={clienteSelecionado}
              onValueChange={(itemValue, itemIndex) =>
                setClienteSelecionado(itemValue)
              }
            >
              <Picker.Item label="Selecione" value={null} />
              {clientes.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item} />
              ))}
            </Picker>
            <Dialog.Button
              label="Fechar"
              onPress={() => setClientesDialog(false)}
            />
          </Dialog.Container>

          <Style.Divider />

          <FlatList
            data={produtosCarrinho}
            style={{ marginTop: 10 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <Style.ContentDescriptionListProduct key={index}>
                <Style.ContentDescriptionListProductText>
                  {item.nome} - {item.quantidade}
                </Style.ContentDescriptionListProductText>
                <View style={{ flexDirection: "row" }}>
                  <Style.ContentDescriptionListProductText>
                    R$ {item.preco}
                  </Style.ContentDescriptionListProductText>
                  <FontAwesome
                    onPress={() => removerProduto(item)}
                    name="remove"
                    size={24}
                    color="red"
                    style={{ marginLeft: 10, alignSelf: "center" }}
                  />
                </View>
              </Style.ContentDescriptionListProduct>
            )}
          />

          <Style.ContentDescriptionBody>
            <Style.ContentDescriptionText>
              Total pago:{" "}
            </Style.ContentDescriptionText>
            <Style.ContentDescriptionBodyText>
              R$ {totalCarrinhoDesconto <= 0 ? "0.00" : totalCarrinhoDesconto}{" "}
            </Style.ContentDescriptionBodyText>
          </Style.ContentDescriptionBody>

          <Style.BtnPagamento
            disabled={loadingPagamento ? true : false}
            onPress={pagamento}
            style={{ marginTop: 10, backgroundColor: "green" }}
          >
            {loadingPagamento ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Style.BtnPagamentoText>
                Confirmar pagamento
              </Style.BtnPagamentoText>
            )}
          </Style.BtnPagamento>
        </Style.ContentDescriptionModal>
      </Modal>

      {/* <Style.ContainerFooter>
        <Style.ContainerTotal>
          <Style.TextTotal>R$ {totalCarrinho}</Style.TextTotal>
        </Style.ContainerTotal>

        <Style.ContainerCarrinho onPress={abrirCarrinho}>
          <Entypo name="shopping-cart" size={24} color="#fff" />
        </Style.ContainerCarrinho>
      </Style.ContainerFooter> */}
    </Style.Container>
  );
}
