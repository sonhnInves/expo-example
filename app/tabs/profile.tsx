import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import LoadingStack from "@/components/loading";
import AppBar from "@/components/AppBar";
import {ScrollView, View} from "react-native";

export default function Profile() {

    const dispatch = useDispatch<AppDispatch>();
    const {loading, data} = useSelector((state: RootState) => state.authMe);

    // useEffect(() => {
    //     dispatch(getProfile());
    // }, [dispatch]);
    return (<LoadingStack isLoading={loading}>
        <AppBar title={'Profile'}/>
        <ScrollView>
            <View style={{flexDirection: 'row'}}>
                <View style={{
                    
                }}></View>
            </View>
        </ScrollView>
    </LoadingStack>)
}
