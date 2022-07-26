import React from 'react'
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputChangeEventData } from 'react-native'
interface TextFieldComponentProps {
    inputStyle?: StyleProp<any>,
    label?: string,
    value: string,
    onInputChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

const TextFieldComponent = (props: TextFieldComponentProps) => {
    return (
        <TextInput
            placeholder={props.label}
            style={props.inputStyle}
            onChange={props.onInputChange}
            value={props.value}
        />
    )
}

export default TextFieldComponent;