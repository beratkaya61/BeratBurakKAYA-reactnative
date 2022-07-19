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
        developerEmail: '',
        createdAt: '',
    });


    const [categories, setCategories]: [Category[], (categories: any) => void] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {

        categoryService.getAll()
            .then((response: any) => {
                setCategories(response.data);
            }).catch((error) => console.log(error));
    }, []);

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
            <MultiLineTextFieldComponent
                label='Description'
                value={addedProduct.description}
                onChange={() => { }}
            />

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
            <Text style={{ padding: 10 }} onPress={() => navigation.navigate('Home')}>
                Selected Category: {selectedCategory}
            </Text>

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

            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
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