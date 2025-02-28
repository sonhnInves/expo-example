import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {Colors} from "@/constants/Colors";

interface ButtonProps {
    title?: string,
    onPress?: () => void,
    stylesButton?: StyleProp<ViewStyle>
}

const Button: React.FC<ButtonProps> = ({title, onPress, stylesButton}) => {
    return <TouchableOpacity onPress={onPress} style={stylesButton}>
        <LinearGradient
            colors={["#FF6F61", "#FF3D71"]}
            style={styles.button}>
            <ThemedText type={'subtitle'} lightColor={Colors.light.background}>{title}</ThemedText>
        </LinearGradient>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    button: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
})
export default Button
