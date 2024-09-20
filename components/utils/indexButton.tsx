import {  Pressable, StyleSheet, Text } from "react-native"

interface Props {
    title: string
    onPress?: () => void
    backgroundColor?: string
    color?: string
    fontSize?: number
    width: number
    height: number
    marginTop: number
}

const IndexButton = (props: Props) => {
    const {title, backgroundColor, color, width, height, marginTop, onPress} = props

    return (
        <Pressable style={{...styles.container, width, height, marginTop, backgroundColor}} onPress={onPress}>
            <Text style={{...styles.text, color}}>{title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 0},
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#000",
        elevation: 4,
    },
    text: {
        paddingTop: 11,
        paddingLeft: 11,
        alignSelf: "center",
        paddingHorizontal: 5,
        fontFamily: "Minecraft",
        fontSize: 50,
        shadowColor: "#000",
        textShadowOffset: {width: 0, height: -0},
        elevation: 5
    }
})

export default IndexButton