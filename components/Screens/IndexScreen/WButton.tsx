import {  Pressable, StyleSheet, Text } from "react-native"

interface Props {
    title: string
    onPress?: () => void
    backgroundColor?: string
    color?: string
    width: number
    height: number
    marginTop: number
}

const WButton = (props: Props) => {
    const {title, backgroundColor, color, width, height, marginTop, onPress} = props

    return (
        <Pressable style={{...styles.container, width, height, marginTop}} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: "Minecraft",
        fontSize: 50,
        textShadowColor: "#FFFF",
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
        color: "#FFFF"
    }
})

export default WButton