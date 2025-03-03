import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {useEffect, useState} from "react";
import {getPosts} from "@/redux/postsSlice";
import LoadingStack from "@/components/loading";
import {FlatList, Pressable, View} from "react-native";
import {Post} from "@/models/posts";
import stylesHome from "@/styles/stylesHome";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import {randomRGB} from "@/utils/functions";
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from "expo-router";

const HomeScreen = () => {
    let limit = 10
    const [page, setPage] = useState(1); // Quản lý số trang
    const [keyword, setKeyword] = useState("");
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {isLoading: isLoadingPost, isLoadingMore, data} = useSelector((state: RootState) => state.posts);
    useEffect(() => {
        dispatch(getPosts({limit: limit, page: 1, search: keyword}))
    }, [dispatch])

    const renderItem = ({item}: { item: Post }) => {
        return <Pressable
            onPress={() => router.push('/post_detail')}
            style={stylesHome.itemContainer}>
            <ThemedText type={'defaultSemiBold'}>{item.title}</ThemedText>
            <View style={stylesHome.wrapChip}>
                {
                    item.tags.map(tag => (
                        <View
                            key={tag}
                            style={{
                                ...stylesHome.chip,
                                backgroundColor: randomRGB(),
                            }}><ThemedText
                            style={{fontSize: 14, color: Colors.light.background}}>{tag}</ThemedText></View>))
                }
            </View>
            <ThemedText type={'subtitle'}>{item.body}</ThemedText>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 16}}>
                <AntDesign name="like2" size={22} color="black"/>
                <ThemedText type={'subtitle'}
                            style={{marginHorizontal: 8, fontSize: 14}}>{item.reactions.likes}</ThemedText>
                <AntDesign name="dislike2" size={22} color="black"/>
                <ThemedText type={'subtitle'}
                            style={{marginHorizontal: 8, fontSize: 14}}>{item.reactions.dislikes}</ThemedText>
                <AntDesign name="eyeo" size={22} color="black"/>
                <ThemedText type={'subtitle'} style={{marginHorizontal: 8, fontSize: 14}}>{item.views}</ThemedText>
            </View>
        </Pressable>
    }
    const onRefresh = () => {
        setPage(1)
        dispatch(getPosts({limit: limit, page: 1, search: ""}))
    }
    const onLoadMore = () => {
        if (!isLoadingMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            dispatch(getPosts({limit, page: nextPage, search: ""}));
        }
    }
    return <LoadingStack isLoading={isLoadingPost}>
        <FlatList
            refreshing={isLoadingPost}
            onRefresh={onRefresh}
            onEndReached={onLoadMore}
            style={stylesHome.flatList}
            contentContainerStyle={{gap: 8}}
            ListFooterComponent={<View style={{height: 100}}/>}
            showsVerticalScrollIndicator={false}
            data={data.posts} renderItem={renderItem}/>
    </LoadingStack>;
}
export default HomeScreen


