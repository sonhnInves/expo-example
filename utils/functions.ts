import DeviceInfo from "react-native-device-info";
import {Platform} from "react-native";

export const marginTopApp = () => {
    let hasNotch = DeviceInfo.hasNotch();
    let hasDynamicIsland = DeviceInfo.hasDynamicIsland();
    if (Platform.OS === 'ios') {
        if (hasDynamicIsland) {
            return 60
        }
        if (hasNotch) {
            return 45
        }
        if (!hasNotch) {
            return 30
        }
    }
    return 12;
}
