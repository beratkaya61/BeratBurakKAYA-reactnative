import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamsList } from '../screens/RootStackParams'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'Home'>

function HomeScreen() {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go Product Detail" onPress={() => navigation.navigate('ProductDetail')} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})