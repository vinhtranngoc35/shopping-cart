import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Text, View, Image, TouchableOpacity, Modal, Alert, Pressable, FlatList } from "react-native"
import { Button, Header, Screen, Icon } from "../../components"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators/app-navigator"
import { StackScreenProps } from "@react-navigation/stack"
import { useStores } from "../../models"



const ROOT: ViewStyle = {
  backgroundColor: '#EBF3F5',
  flex: 1,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[4],
  paddingHorizontal: spacing[4],
  paddingTop: spacing[4],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  color: 'black',
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
interface Color {
  id: string,
  color: string,
  status: boolean,
}
interface Props {
  name: Color,
  index: number,
}



export const ProductDetailScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(function ProductDetailScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const COLORS: Color[] = [{ id: '1', color: 'Black', status: false }, { id: '2', color: 'Blue', status: false }, { id: '3', color: 'Gold', status: false }, { id: '4', color: 'White', status: false }]
  const displayCurrency = (number: number) => {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "đ"
  }
  const goBack = () => navigation.navigate('home')
  const { productStore } = useStores()
  const { product } = productStore
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalCard, setModalCardVisible] = React.useState(false)
  const [dataColors, setDataColors] = React.useState(COLORS)
  const [quantity, setQuantity] = React.useState(1)

  const Item: FC<Props> = ({ name, index }) => (
    <TouchableOpacity style={{ backgroundColor: '#b2ebf2', height: 40, alignItems: 'center', justifyContent: 'center', width: 70, margin: 5, borderWidth: name.status ? 1 : 0, borderColor: name.status ? '#f4511e' : 'none' }}
      onPress={() => { onPressButtonColor(index) }}
    >
      <Text style={{ color: name.status ? '#f4511e' : '#263238', fontWeight: 'bold' }}>{name.color}</Text>
      {/* <Button title={item.color} /> */}
    </TouchableOpacity>)

  const onPressButtonColor = (indexSelector: number) => {
    const temp = dataColors[indexSelector].status
    dataColors.forEach((item) => {
      item.status = false
    })
    dataColors[indexSelector].status = !temp
    console.log(dataColors)
    setDataColors([...dataColors])
  }

  const renderItem = ({ item, index }) => {
    return <Item name={item} index={index} />
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ height: 50, backgroundColor: '#424242', paddingTop: 10, paddingLeft: 20 }}>
            {/* <Text>Back</Text> */}
            <Button preset="link" onPress={() => setModalVisible(false)}>
              <Icon icon='back' />
            </Button>
          </View>
          <View style={{ flex: 1, backgroundColor: '#424242', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{
              width: '100%',
              height: '80%',
              resizeMode: 'cover',
              marginBottom: 30
            }}

              source={{ uri: product.imageUrl }}
            />
          </View>
        </View>

      </Modal>
      <Header
        headerTx="productDetail.title"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <View style={{
        flex: 3.5,
      }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          <Image style={{
            width: '100%',
            height: '100%',
            resizeMode: 'stretch'
          }}

            source={{ uri: product.imageUrl }}
          />
        </TouchableOpacity>
      </View>

      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 5,
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
        marginTop: 5
      }}>
        <Text
          style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 5, marginBottom: 5 }}
        >{product.name}</Text>
        <Text
          style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginTop: 5, marginBottom: 5 }}
        >{displayCurrency(product.salePrice)}</Text>
      </View>
      <View style={{ flex: 1, padding: 5, marginTop: 5, marginBottom: 5, backgroundColor: '#FFFFFF' }}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
            Select a color
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
          <FlatList
            numColumns={dataColors.length}
            data={[...dataColors]}
            keyExtractor={(item) => item.id}
            renderItem={renderItem} />
        </View>
      </View>
      <View style={{ flex: 0.5, flexDirection: 'row' }}>
        <View style={{ flex: 3, backgroundColor: '#1de9b6', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, height: 30 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Chat</Text>
          </View>
          <TouchableOpacity onPress={() => { setModalCardVisible(!modalCard) }} style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add cart</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4511e' }}>
          <Text style={{ color: '#eeeeee', fontWeight: 'bold' }}>Buy</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCard}
        onRequestClose={() => {
          setModalCardVisible(!modalCard);
        }}
      >
        <Pressable onPress={() => { setModalCardVisible(!modalCard) }} style={{ height: '50%', width: '100%', backgroundColor: 'rgba(238,238,238,0.3)' }}>

        </Pressable>
        <View style={{ height: '50%', width: '100%', backgroundColor: '#EBF3F5', borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
          <View style={{ flex: 3, flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                >
                  <Image style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'stretch'
                  }}
                    source={{ uri: product.imageUrl }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 4, justifyContent: 'flex-end', padding: 10 }}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>{displayCurrency(product.salePrice)}</Text>
                <Text style={{ color: 'black', marginTop: 10 }}>Stock in available</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalCardVisible(!modalCard)}>
                <Text style={{ fontSize: 20, color: 'grey' }}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
            <FlatList
              numColumns={dataColors.length}
              data={[...dataColors]}
              keyExtractor={(item) => item.id}
              renderItem={renderItem} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderBottomColor: 'grey', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Quantity</Text>
            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity
                style={{ width: 30, height: 20, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity)
                }}
              >
                <Text>-  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 30, height: 20, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
                <Text>{quantity}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: 30, height: 20, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  quantity < 10 ? setQuantity(quantity + 1) : Alert.prompt('Quantity out of range')
                }}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, padding: 5 }}>
              <TouchableOpacity style={{ backgroundColor: '#1de9b6', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Add to cart</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3, padding: 5 }}>
              <TouchableOpacity disabled={true} style={{ backgroundColor: '#f4511e', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen >
  )
})

