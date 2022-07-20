import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInput
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CategoryItem from '../common/CategoryItem'
import MultiLineTextFieldComponent from '../common/MultiLineTextFieldComponent'
import TextFieldComponent from '../common/TextFieldComponent'
import { colors, parameters } from '../global/styles'
import categoryService from '../services/category-service'
import Category from '../types/Category.type'
import Product from '../types/Product.type'
import { RootStackParamsList } from './RootStackParams'

import productService from '../services/product-service'


type AddProductScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'AddProduct'>

const AddProductScreen: React.FC = () => {

    const navigation = useNavigation<AddProductScreenNavigationProp>();

    const [addedProduct, setAddedProduct] = useState<Product>({
        id: '',
        name: '',
        price: '',
        category: '',
        description: '',
        avatar: '',
        developerEmail: 'kayaberat.burak@gmail.com',
        createdAt: Date.now(),
    });


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
        //https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1633027804000
        console.log('addedProduct nedir :', addedProduct)

        productService.create(addedProduct).then((response: any) => {
            console.log('response nedir :', response.data)
            navigation.navigate('Home')
        }).catch((error) => console.log(error));
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                }}
                placeholder='Product title'
                value={addedProduct.name}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    console.log('e.nativeEvent nedir :', e.nativeEvent)
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, name: value });
                }}
            />
            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                }}
                placeholder='Price'
                value={addedProduct.price}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    console.log('e.nativeEvent nedir :', e.nativeEvent)
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, price: value });
                }}
            />

            <TextInput
                style={{
                    height: 70,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                    color: colors.black,
                }}
                multiline
                numberOfLines={5}
                placeholder='Description'
                value={addedProduct.description}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    console.log('e.nativeEvent nedir :', e.nativeEvent)
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, description: value });
                }}
            />

            {/* <MultiLineTextFieldComponent
                label='Description'
                value={addedProduct.description}
                onChange={() => { }}
            /> */}

            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                }}
                placeholder='Image Link'
                value={addedProduct.avatar}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    console.log('e.nativeEvent nedir :', e.nativeEvent)
                    const value = e.nativeEvent.text;
                    setAddedProduct({ ...addedProduct, avatar: value });
                }}
            />


            {/* <TextFieldComponent
                label='Product title'
                value={addedProduct.name}
                onChange={({nativeEvent: { text },}: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                    setAddedProduct({ ...addedProduct, name: text });
                }}
            />
            <TextFieldComponent
                label='Price'
                value={addedProduct.price}
                onChange={() => { }}
            /> */}

            {/* <TextFieldComponent
                label='Image Link'
                value={addedProduct.avatar}
                onChange={() => { }}
            /> */}
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