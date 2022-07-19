import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamsList } from '../screens/RootStackParams'
import Product from '../types/Product.type'
import productService from '../services/product-service'
import { colors, parameters } from '../global/styles';
import CardItem from '../common/CardItem'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'Home'>

const HomeScreen: React.FC = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [products, setProducts]: [Product[], (products: any) => void] = useState([]);

    useEffect(() => {
        productService
            .getAll()
            .then((response: any) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <View style={styles.container}>
            {/* <Button title="Go Product Detail" onPress={() => navigation.navigate('ProductDetail')} /> */}
            <FlatList
                data={products}
                numColumns={2}
                indicatorStyle="white"
                contentContainerStyle={{
                    padding: 20,
                }}
                renderItem={({ item }: ListRenderItemInfo<Product>) => (
                    <CardItem product={item} />
                )}
                keyExtractor={(item: Product) => item.id}
            />
            <View style={styles.addButtonContainer}>
                <Image style={styles.addButton} source={require('../images/addButton.png')} />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: parameters.statusBarHeight,
        backgroundColor: colors.grey10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    addButton: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        backgroundColor:'transparent',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.black,
    }
})