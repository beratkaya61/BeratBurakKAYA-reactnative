import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, ListRenderItemInfo, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamsList } from '../screens/RootStackParams'

import Product from '../types/Product.type'
import Category from '../types/Category.type'

import productService from '../services/product-service'
import categoryService from '../services/category-service'

import { colors, parameters } from '../global/styles';

import CardItem from '../common/CardItem'
import CategoryItem from '../common/CategoryItem'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'Home'>

const HomeScreen: React.FC = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [products, setProducts]: [Product[], (products: any) => void] = useState([]);
    const [categories, setCategories]: [Category[], (categories: any) => void] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        productService
            .getAll()
            .then((response: any) => {
                //console.log('all products : ', response.data);
                setProducts(response.data);
            })
            .catch((error) => console.log(error));

        categoryService.getAll()
            .then((response: any) => {
                console.log('all categories : ', response.data);
                setCategories(response.data);
            }).catch((error) => console.log(error));
    }, []);

    useEffect(() => {

        if (selectedCategory === 'All') {
            //select all products
            productService
                .getAll()
                .then((response: any) => {
                    //console.log('all products : ', response.data);
                    setProducts(response.data);
                })
                .catch((error) => console.log(error));
        } else {
            //get all products by selected category
            productService
                .getAll()
                .then((response: any) => {
                    const selectedProducts: any = response.data.filter((product: Product) => product.category === selectedCategory);
                    setProducts(selectedProducts);
                }).catch((error) => console.log(error));
        }
    }, [selectedCategory]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {parameters.appName}
                </Text>
                {Platform.OS === 'android' && (
                    <FontAwesome name="search" size={24} color="black" />
                )}
                {Platform.OS === 'ios' && (
                    <Image style={styles.headerSearchIcon} source={require('../images/search.png')} />
                )}
            </View>
            <View style={styles.categoriesContainer}>
                <TouchableOpacity
                    onPress={() => setSelectedCategory('All')}
                    style={{
                        ...styles.categoryFirstItemContainer,
                        backgroundColor: selectedCategory === 'All' ? colors.white : colors.black,
                        borderColor: selectedCategory === 'All' ? colors.black : colors.white,
                        borderWidth: selectedCategory === 'All' ? 2 : 0,
                    }}>
                    <Text
                        style={{
                            ...styles.categoryFirstItemText,
                            color: selectedCategory === 'All' ? colors.black : colors.white
                        }}>
                        All
                    </Text>
                </TouchableOpacity>

                <View style={{
                    backgroundColor: colors.black,
                    margin: 10,
                    height: 45,
                    padding: 1,
                }} />

                <FlatList
                    data={categories}
                    horizontal={true}
                    indicatorStyle='white'
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }: ListRenderItemInfo<Category>) => (
                        <CategoryItem
                            screenPage={1}
                            colorPalette={[colors.black, colors.white, colors.grey6]}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            category={item}
                        />
                    )}
                    keyExtractor={(item: Category) => item.id}
                />
            </View>

            <FlatList
                data={products}
                numColumns={2}
                indicatorStyle="white"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                }}
                renderItem={({ item }: ListRenderItemInfo<Product>) => (
                    <CardItem
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                        product={item}
                    />
                )}
                keyExtractor={(item: Product) => item.id}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate('AddProduct')}
                style={styles.addButtonContainer}>
                {Platform.OS === 'android' && (
                    <AntDesign style={styles.addButton} name="pluscircleo" size={50} color="black" />
                )}
                {Platform.OS === 'ios' && (
                    <Image style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'contain',
                        backgroundColor: 'transparent',
                        borderRadius: 25,
                        borderWidth: 2,
                        borderColor: colors.black,
                    }} source={require('../images/addButton.png')} />
                )}
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: parameters.statusBarHeight,
        backgroundColor: colors.grey10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
    },
    headerSearchIcon: {
        width: 30,
        height: 25,
        resizeMode: 'contain',
        backgroundColor: 'transparent',
    },
    categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        // shadowColor: colors.black,
        // shadowOffset: {
        //     width: 0,
        //     height: 11,
        // },
        // shadowOpacity: 0.57,
        // shadowRadius: 15.19,
        // elevation: 10,
    },
    categoryFirstItemContainer: {
        backgroundColor: colors.black,
        height: 45,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryFirstItemText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'bold',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    addButton: {
        backgroundColor: colors.white,
        borderRadius: 25,
    }
})




