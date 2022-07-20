import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ProductDetailProp, RootStackParamsList } from '../screens/RootStackParams'
import { colors } from '../global/styles'
import { LinearGradient } from 'expo-linear-gradient'

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
            <LinearGradient
                colors={[colors.white, colors.grey1, colors.black]}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: '60%',
                    width: '100%',
                    // borderBottomLeftRadius: 10,
                    // borderBottomRightRadius: 10,
                    justifyContent: 'flex-end',
                }}
            // start={{ x: 0, y: 0 }}
            // end={{ x: 0, y: 1 }}
            >
                <View style={styles.detailContainer}>
                    <View style={styles.detailHeaderContainer}>
                        <Text style={styles.detailTitle}>{product.name}</Text>
                        <Text style={styles.detailPrice}>{'$' + product.price}</Text>
                    </View>
                    <View style={styles.detailBodyContainer}>
                        <Text style={styles.detailDescription}>{product.description}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'red',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '40%',
        backgroundColor: colors.grey6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        marginTop: '10%',
        height: '95%',
        resizeMode: 'contain'
    },
    detailContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '80%',
        backgroundColor: colors.black,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 10,
            height: 9,
        },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 23,
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
        fontSize: 15,
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