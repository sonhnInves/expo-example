import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import LoadingStack from "@/components/loading";
import AppBar from "@/components/AppBar";
import {ScrollView, View} from "react-native";
import ImageCustom from "@/components/ImageCustom";
import {ThemedText} from "@/components/ThemedText";
import Feather from '@expo/vector-icons/Feather';
import stylesProfile from "@/styles/stylesProfile";
import {useEffect} from "react";
import {getProfile} from "@/redux/profileSlice";


export default function Profile() {

    const dispatch = useDispatch<AppDispatch>();
    const {loading, data} = useSelector((state: RootState) => state.authMe);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    return (<LoadingStack isLoading={loading}>
        <AppBar title={'Profile'}/>
        <ScrollView>
            <View style={stylesProfile.row}>
                <ImageCustom source={data.image}/>
                <View style={{flex: 1, marginHorizontal: 8}}>
                    <ThemedText type={'subtitle'}>{data.firstName} {data.lastName} ({data.maidenName})</ThemedText>
                    <ThemedText type={'subtitle'}>{data.phone}</ThemedText>
                    <ThemedText type={'subtitle'}>{data.email}</ThemedText>
                </View>
                <Feather name="edit" size={24} color="black"/>
            </View>
        </ScrollView>
    </LoadingStack>)
}
