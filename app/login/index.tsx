import {useRouter} from 'expo-router';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {loginSuccess, loginUser} from "@/redux/authSlice";
import {saveAuthenticate, saveToken} from "@/shared/localStoregate";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import TextField from "@/components/TextField";
import Button from "@/components/Button";

const LoginScreen = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleLogin = async () => {
        const result = await dispatch(loginUser({username, password}));
        if (loginUser.fulfilled.match(result)) {
            await saveAuthenticate('true');
            await saveToken(result.payload);
            router.replace("/tabs");
            dispatch(loginSuccess());
        }
    };
    return (<View style={styles.container}>
        <Image source={require('@/assets/images/login.png')} resizeMode={'cover'}
               style={{maxHeight: 400, maxWidth: Dimensions.get('screen').width}}/>
        <View style={styles.loginContainer}>
            <ThemedText
                type={'subtitle'}
                lightColor={Colors.light.red}>
                Login
            </ThemedText>
            <TextField text={username} onChangeText={setUserName} color={Colors.light.red} nameIcon={'person'}
                       placeholder={'Username'}
                       stylesProp={{marginVertical: 8}}/>
            <TextField text={password} onChangeText={setPassword} color={Colors.light.red} nameIcon={'lock.circle'}
                       placeholder={'Password'}
                       stylesProp={{marginVertical: 8}} isPassword={true} secureTextEntry={isShowPassword}
                       onPressShowPass={() => {
                           setIsShowPassword(!isShowPassword)
                       }}/>
            <Button title={'Login'} onPress={handleLogin} stylesButton={{marginTop: 20}}/>
        </View>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    loginContainer: {
        padding: 16,
        marginTop: -30,
        backgroundColor: Colors.light.background,
        marginHorizontal: 16,
        borderRadius: 15,
        shadowColor: Colors.light.red,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    }
});
export default LoginScreen;
