import {Image, ImageProps} from "expo-image";
import {ImageSource} from "expo-image/src/Image.types";

interface ImageProp {
    width?: number;
    height?: number;
    source:  string | undefined,
}

const ImageCustom = (props: ImageProp) => {
    const {width = 70, height = 70} = props;
    return <Image style={{
        width: width,
        height: height,
        borderRadius: width,
    }}
                  source={{uri: props.source}}
                  placeholder={{uri:'https://picsum.photos/seed/696/3000/2000'}}
                  contentFit="cover"
                  transition={1000}/>
}
export default ImageCustom
