import React from 'react'
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputChangeEventData } from 'react-native'

interface MultiLineTextFieldComponentProps {
    inputStyle?: StyleProp<any>,
    label?: string,
    value: string,
    onInputChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

const MultiLineTextFieldComponent = (props: MultiLineTextFieldComponentProps) => {
    return (
        <TextInput
            multiline
            numberOfLines={5}
            placeholder={props.label}
            style={props.inputStyle}
            onChange={props.onInputChange}
            value={props.value}
        />
    )
}

export default MultiLineTextFieldComponent;