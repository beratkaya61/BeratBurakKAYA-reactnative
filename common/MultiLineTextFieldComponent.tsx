import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface MultiLineTextFieldComponentProps {
    value: string,
    label: string,
    onChange: () => void
}

const MultiLineTextFieldComponent = (props: MultiLineTextFieldComponentProps) => {
    return (
        <TextInput
            multiline
            numberOfLines={5}
            placeholder={props.label}
            style={styles.input}
            onChangeText={props.onChange}
            value={props.value}
        />
    )
}

export default MultiLineTextFieldComponent

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top'
    }
})