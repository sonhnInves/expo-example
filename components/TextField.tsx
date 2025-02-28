import {StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import React from "react";
import {IconSymbol, IconSymbolName} from "@/components/ui/IconSymbol";
import {Colors} from "@/constants/Colors";

interface TextFieldProps {
    color: string;
    isIcon?: boolean;
    isPassword?: boolean;
    nameIcon: IconSymbolName;
    placeholder?: string;
    secureTextEntry?: boolean;
    stylesProp?: StyleProp<ViewStyle>;
    onPressShowPass?: () => void;
    text?: string;
    onChangeText?: (text: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
                                                 color,
                                                 isIcon,
                                                 nameIcon,
                                                 placeholder,
                                                 secureTextEntry,
                                                 stylesProp,
                                                 isPassword,
                                                 onPressShowPass,
                                                 text, onChangeText
                                             }) => {
    return <View style={[stylesProp, styles.container]}>
        {
            !isIcon && <IconSymbol size={22} name={nameIcon} color={color}/>
        }
        <TextInput value={text} onChangeText={onChangeText} style={styles.textInput} placeholder={placeholder}
                   secureTextEntry={secureTextEntry}/>
        {
            isPassword && <TouchableOpacity onPress={onPressShowPass}>
                <IconSymbol size={22} name={secureTextEntry ? 'eye.slash' : 'eye.fill'} color={color}/>
            </TouchableOpacity>
        }
    </View>
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: Colors.light.gray200,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        marginLeft: 8
    }
})
export default TextField
