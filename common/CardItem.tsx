import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';

import Product from '../types/Product.type';

import { colors, parameters } from '../global/styles';

interface CardItemProps {
    product: Product,
    onPress: () => void
}

function CardItem(props: CardItemProps) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.cardContainer}>
            <View style={styles.cardBody}>
                <Image source={{ uri: props.product.avatar }} style={styles.cardImage} />
            </View>

            <LinearGradient
                colors={[colors.transparent, colors.grey7]}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: '30%',
                    width: '100%',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    justifyContent: 'flex-end',
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <View style={styles.cardInfoContainer}>
                    <Text style={styles.cardInfoTitle}>{props.product.name}</Text>
                    <View style={styles.cardInfoBody}>
                        <Text style={styles.cardInfoBodyPrice}>{'$' + props.product.price}</Text>
                        <Image source={require('../images/pencil2.png')} style={styles.cardInfoBodyImage} />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default CardItem;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.grey5,
        borderRadius: 10,
        width: '48%',
        height: parameters.SCREEN_HEIGHT * 0.3,
        margin: '2%',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 15,
    },
    cardBody: {
        borderRadius: 10,
        width: '80%',
        marginHorizontal: '10%',
        height: '70%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {
        width: '90%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardInfoContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '70%',
        backgroundColor: colors.black,
        borderRadius: 10,
        paddingVertical: 5,
    },
    cardInfoTitle: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    cardInfoBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardInfoBodyPrice: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    cardInfoBodyImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
    }
})