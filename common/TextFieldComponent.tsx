import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface TextFieldComponentProps {
    value: string,
    label: string,
    onChange: () => void
}

const TextFieldComponent = (props: TextFieldComponentProps) => {
    return (
        <TextInput
            placeholder={props.label}
            style={styles.input}
            onChangeText={props.onChange}
            value={props.value}
        />
    )
}

export default TextFieldComponent

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    }
})