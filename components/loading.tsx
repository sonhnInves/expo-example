import React, {ReactNode} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";

interface LoadingStackProps {
    children?: ReactNode;
    isLoading: boolean;
}

const LoadingStack: React.FC<LoadingStackProps> = ({children, isLoading}) => {
    return (<View style={styles.container}>
        {children}
        {isLoading && (
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#ffffff"/>
            </View>
        )}
    </View>);
}
const styles = StyleSheet.create({
    activityIndicator: {
        position: "absolute",
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.light.background,
        paddingHorizontal: 16
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu đen mờ 50%
        justifyContent: "center",
        alignItems: "center",
    },
})
export default LoadingStack;
