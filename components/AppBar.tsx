import {StyleSheet, View} from "react-native";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Colors} from "@/constants/Colors";
import React, {ReactNode} from "react";
import {marginTopApp} from "@/utils/functions";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";

interface AppBarProps {
    isBackButton?: boolean;
    isActionRight?: boolean;
    actionRight?: ReactNode;
    title?: string;
}

const AppBar: React.FC<AppBarProps> = ({title, isBackButton, isActionRight, actionRight}) => {
    return (<View style={styles.row}>
        {isBackButton ? <IconSymbol name={'arrow.left'} color={Colors.light.text} onPress={() => router.back()}/> :
            <View/>}
        <ThemedText type={'subtitle'} lightColor={Colors.light.text}>{title}</ThemedText>
        {isActionRight ? actionRight : <View/>}
    </View>)
}
const styles = StyleSheet.create({
    row: {
        width: '100%',
        marginTop: marginTopApp(),
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
export default AppBar
