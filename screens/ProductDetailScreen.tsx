import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ProductDetailProp, RootStackParamsList } from '../screens/RootStackParams'
import { colors } from '../global/styles'

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'ProductDetail'>

const ProductDetailScreen: React.FC = () => {

    const navigation = useNavigation<ProductDetailScreenNavigationProp>();

    const route = useRoute<ProductDetailProp>();
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.bodyContainer}>
                <Image source={{ uri: product.avatar }} style={styles.image} />
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailHeaderContainer}>
                    <Text style={styles.detailTitle}>{product.name}</Text>
                    <Text style={styles.detailPrice}>{'$' + product.price}</Text>
                </View>
                <View style={styles.detailBodyContainer}>
                    <Text style={styles.detailDescription}>{product.description}</Text>
                </View>
            </View>
            {/* <Button title="Go Home Screen" onPress={() => navigation.navigate('Home')} /> */}
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: colors.grey6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    detailContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: colors.black,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10
    },
    detailHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    detailTitle: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    detailPrice: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailBodyContainer: {
        padding: 10,
    },
    detailDescription: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '500',
    },
})