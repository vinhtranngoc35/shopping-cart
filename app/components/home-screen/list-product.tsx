import React, { FC, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { useStores } from '../../models'
import { Product } from '../../models/product/product'


interface PropsListProduct {
    navigation: undefined
}
const ListProduct: FC<PropsListProduct> = ({ navigation }) => {
    const { productStore } = useStores()
    const { products } = productStore
    useEffect(() => {
        async function fetchData() {
            await productStore.getProducts().then(() => { console.log('demo') })
        }
        fetchData()
    }, [])
    return (
        <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={[...products]}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => (
                <Item product={item} navigation={navigation} />
                // <Text style={{ color: 'black' }}>{item.name}</Text>
            )
            }
        />

    )
}
interface Props {
    product: Product
    navigation: undefined
}

const Item: FC<Props> = ({ product, navigation }) => {
    const { productStore } = useStores()
    const displayCurrency = (number: number) => {
        return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
    return (
        <TouchableOpacity style={{
            marginTop: 5,
            flex: 0.49,
            backgroundColor: '#FFFFFF',
            height: 300,
            padding: 20,
            borderRadius: 20
        }}
            onPress={() => {
                productStore.setProductSelected(product.item)
                navigation.navigate('detail')
            }}
        >
            <View style={{
                flex: 3,
                justifyContent: 'center',
                alignContent: 'center'
            }}>
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    source={{
                        uri: product.item.imageUrl,
                    }} />
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black'
                }}>{product.item.name}</Text>
                <Text style={{
                    fontSize: 18,
                    color: 'grey'
                }}>{displayCurrency(product.item.salePrice)}</Text>
            </View>
        </TouchableOpacity >
    )
}

export default ListProduct

const styles = StyleSheet.create({})
