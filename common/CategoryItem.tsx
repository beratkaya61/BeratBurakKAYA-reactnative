import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useState } from 'react'
import Category from '../types/Category.type'
import { colors } from '../global/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface CategoryItemProps {
    category: Category,
    selectedCategory: string,
    setSelectedCategory: (category: string) => void,
}

function CategoryItem(props: CategoryItemProps) {

    return (
        <TouchableOpacity
            onPress={() => props.setSelectedCategory(props.category.name)}
            style={{
                ...styles.categoryItemContainer,
                backgroundColor: props.selectedCategory === props.category.name ? colors.white : colors.black,
                borderColor: props.selectedCategory === props.category.name ? colors.black : colors.white,
                borderWidth: props.selectedCategory === props.category.name ? 2 : 0,
            }}>
            <Text
                style={{
                    ...styles.categoryItem,
                    color: props.selectedCategory === props.category.name ? colors.black : colors.white
                }}>{props.category.name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    categoryItemContainer: {
        backgroundColor: colors.black,
        height: 45,
        padding: 5,
        margin: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryItem: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'bold',
    }
})