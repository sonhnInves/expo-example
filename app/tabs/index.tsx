import {View} from "react-native";
import {ThemedText} from "@/components/ThemedText";

// export default function HomeRedirect() {
//     return <Redirect href="/home_stack/home"/>;
// }
const HomeScreen = () => {
    return <View style={{marginTop: 100, flex: 1}}>
        <ThemedText>Home Screen</ThemedText>
    </View>
}
export default HomeScreen


