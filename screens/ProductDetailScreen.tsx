import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamsList } from '../screens/RootStackParams'

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'ProductDetail'>

const ProductDetailScreen: React.FC = () => {

    const navigation = useNavigation<ProductDetailScreenNavigationProp>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ProductDetailScreen</Text>
            <Button title="Go Home Screen" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})