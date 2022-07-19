import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CategoryItem from '../common/CategoryItem'
import MultiLineTextFieldComponent from '../common/MultiLineTextFieldComponent'
import TextFieldComponent from '../common/TextFieldComponent'
import { colors, parameters } from '../global/styles'
import categoryService from '../services/category-service'
import Category from '../types/Category.type'
import { RootStackParamsList } from './RootStackParams'

type AddProductScreenNavigationProp = StackNavigationProp<RootStackParamsList, 'AddProduct'>

const AddProductScreen: React.FC = () => {

    const navigation = useNavigation<AddProductScreenNavigationProp>();

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
            <TextFieldComponent
                label='Product title'
                value={''}
                onChange={() => { }}
            />
            <TextFieldComponent
                label='Price'
                value={''}
                onChange={() => { }}
            />
            <MultiLineTextFieldComponent
                label='Description'
                value={''}
                onChange={() => { }}
            />
            <TextFieldComponent
                label='Image Link'
                value={''}
                onChange={() => { }}
            />
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