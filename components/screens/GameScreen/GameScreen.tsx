import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const MinigamesScreen = () => {
  const router = useRouter();

    const handleTicTacToe = () => {
        router.push("/gameScreen1");
    };

  const handleFlyerEars = () => {
    router.push("/gameScreen2");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleButton} disabled={true}>
        <Text style={styles.title}>Minigames</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gameSlot} onPress={handleTicTacToe}>
        <Text style={styles.gameText}>Tic Tac Toe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gameSlot} onPress={handleFlyerEars}>
        <Text style={styles.gameText}>Flyer Blocks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Alinhamento vertical centralizado
    alignItems: "center", // Alinhamento horizontal centralizado
    backgroundColor: "#E67C07", // Fundo laranja
    paddingVertical: 50, // Espaçamento para ajustar verticalmente
  },
  titleButton: {
    backgroundColor: "#E62E07", 
    width: "80%",
    paddingVertical: 10,
    marginBottom: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontFamily: "Minecraft", 
    color: "#FFF", 
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameSlot: {
    width: "70%",
    height: 100,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  gameText: {
    fontSize: 18,
    fontFamily: "Minecraft",
    color: "#000",
    textAlign: "center",
  },
});

export default MinigamesScreen;
