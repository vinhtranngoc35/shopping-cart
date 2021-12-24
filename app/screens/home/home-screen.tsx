import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { ViewStyle } from "react-native"
import { Screen, } from "../../components"
import Header from "../../components/home-screen/header"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import ListProduct from "../../components/home-screen/list-product"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators/app-navigator"
const ROOT: ViewStyle = {
  backgroundColor: '#EBF3F5',
  flex: 1,

}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(function HomeScreen({ navigation }) {


  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={header}>
        <Header />
      </View>
      <View style={body}>
        <ListProduct navigation={navigation} />
      </View>
    </Screen>
  )
})
const header: ViewStyle = {
  flex: 1,
  backgroundColor: '#FFFFFF',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 20,
  borderTopRightRadius: 200,
  borderBottomRightRadius: 30,
  borderBottomLeftRadius: 30
}

const body: ViewStyle = {
  flex: 4,
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 20,
}