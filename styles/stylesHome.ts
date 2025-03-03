import {StyleSheet} from "react-native";
import {marginTopApp} from "@/utils/functions";

const stylesHome = StyleSheet.create({
    flatList: {
        marginTop: marginTopApp(),
        // marginBottom: 100
    },
    itemContainer: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    chip: {
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    wrapChip: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8
    }
})
export default stylesHome
