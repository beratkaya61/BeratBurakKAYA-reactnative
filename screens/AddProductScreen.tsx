import React, { useEffect, useState } from 'react'

import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import CategoryItem from '../common/CategoryItem'
import MultiLineTextFieldComponent from '../common/MultiLineTextFieldComponent'
import TextFieldComponent from '../common/TextFieldComponent'

import { colors, parameters } from '../global/styles'

import categoryService from '../services/category-service'
import productService from '../services/product-service'

import Category from '../types/Category.type'
import Product from '../types/Product.type'

import { RootStackParamsList } from './RootStackParams'

type AddProductScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'AddProduct'>

const AddProductScreen: React.FC<Product> = () => {

    const navigation = useNavigation<AddProductScreenNavigationProp>();

    const [addedProduct, setAddedProduct] = useState<Product>({
        developerEmail: 'kayaberat.burak@gmail.com',
        createdAt: Date.now(),
    } as Product);

    const [categories, setCategories]: [Category[], (categories: any) => void] = useState([]);

    const setSelectedCategory = (category: string) => {
        setAddedProduct({
            ...addedProduct,
            category: category,
        });
    }

    useEffect(() => {

        categoryService.getAll()
            .then((response: any) => {
                setCategories(response.data);
            }).catch((error) => console.log(error));
    }, []);

    const saveProduct = () => {

        console.log('saveProduct : ', addedProduct);
        return

        productService.create(addedProduct).then((response: any) => {
            navigation.navigate('Home')
        }).catch((error) => console.log(error));
    }

    return (
        <View style={styles.container}>
            <TextFieldComponent
                label='Product title'
                inputStyle={{
                    height: 40,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                }}
                value={addedProduct.name}
                onInputChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, name: value });
                }}
            />

            <TextFieldComponent
                label='Price'
                value={addedProduct.price}
                inputStyle={{
                    height: 40,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                }}
                onInputChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, price: value });
                }}
            />

            <MultiLineTextFieldComponent
                label='Description'
                value={addedProduct.description}
                inputStyle={{
                    height: 70,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                    color: colors.black,
                }}
                onInputChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, description: value });
                }}
            />

            <TextFieldComponent
                label='Image Link'
                value={addedProduct.avatar}
                inputStyle={{
                    height: 40,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                }}
                onInputChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, avatar: value });
                }}
            />

            <Text style={{ padding: 10 }}>
                Selected Category: {addedProduct.category}
            </Text>

            <FlatList
                data={categories}
                horizontal={true}
                indicatorStyle='white'
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }: ListRenderItemInfo<Category>) => (
                    <CategoryItem
                        screenPage={2}
                        colorPalette={[colors.black, colors.white, colors.grey6]}
                        selectedCategory={addedProduct.category}
                        setSelectedCategory={setSelectedCategory}
                        category={item}
                    />
                )}
                keyExtractor={(item: Category) => item.id}
            />

            <TouchableOpacity
                onPress={saveProduct}
                style={{
                    backgroundColor: colors.black,
                    padding: 10,
                    width: 150,
                    alignSelf: 'center',
                    marginBottom: 30,
                    borderRadius: 10,
                }}>
                <Text
                    style={{
                        color: colors.white,
                        fontSize: 15,
                        textAlign: 'center',
                        fontWeight: '500',
                    }}>
                    Add Product
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: parameters.statusBarHeight,
        backgroundColor: colors.grey6,
        padding: 10,
    }
})