import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, ListRenderItemInfo, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
            {/* <Button title="Go Product Detail" onPress={() => navigation.navigate('ProductDetail')} /> */}

            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {parameters.appName}
                </Text>
                <Image style={styles.headerSearchIcon} source={require('../images/search.jpeg')} />
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
                <FlatList
                    data={categories}
                    horizontal={true}
                    indicatorStyle='white'
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }: ListRenderItemInfo<Category>) => (
                        <CategoryItem
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
        width: 50,
        height: 50,
        resizeMode: 'contain',
        backgroundColor: 'transparent',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.black,
    }
})