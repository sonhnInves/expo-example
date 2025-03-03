import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {Stack, useRouter} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import "react-native-reanimated";
import {useColorScheme} from "@/hooks/useColorScheme";
import {getAuthenticate} from "@/shared/localStoregate";

SplashScreen.preventAutoHideAsync();

export default function RootNavigator() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    });
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <AuthNavigator/>
            <StatusBar style="auto"/>
        </ThemeProvider>
    )
}

function AuthNavigator() {
    const router = useRouter();
    useEffect(() => {
        const checkLoginSuccess = async () => {
            const isAuthenticated = await getAuthenticate();
            if (isAuthenticated === "true") return router.replace("/tabs");
            if (isAuthenticated === "false") return router.replace("/login");
            return router.replace("/login");
        }
        checkLoginSuccess()
    }, []);
    return (
        <Stack>
            <Stack.Screen name="login/index" options={{headerShown: false}}/>
            <Stack.Screen name="tabs" options={{headerShown: false}}/>
            <Stack.Screen name="home_stack" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found" options={{headerShown: false}}/>
            <Stack.Screen name="post_detail/index" options={{headerShown: false}}/>
        </Stack>
    );
}
