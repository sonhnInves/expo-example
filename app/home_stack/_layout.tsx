import {Stack} from "expo-router";

export default function HomeStackLayout() {
    return <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="home/index"/>
        <Stack.Screen name="home_detail/index"/>
    </Stack>;
}
