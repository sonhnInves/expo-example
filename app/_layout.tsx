import 'react-native-reanimated';

import {Provider} from "react-redux";
import {storeApp} from "@/redux/store";
import RootNavigator from "@/app/root_natigator";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
    return (
        <Provider store={storeApp}>
            <RootNavigator/>
        </Provider>
    );
}
