import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useProgress } from "@/components/Progresso"

const MinigamesScreen = () => {
  const router = useRouter();
  const progress = useProgress()

  const handleTicTacToe = () => {
    progress.incrementFun(10)
    router.push("/Inside/gameScreen1");
  };

  const handleFlyerBlocks = () => {
    progress.incrementFun(10)
    router.push("/Inside/gameScreen2");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleButton} disabled={true}>
        <Text style={styles.title}>Minigames</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gameSlot} onPress={handleTicTacToe}>
        <Text style={styles.gameText}>Tic Tac Toe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gameSlot} onPress={handleFlyerBlocks}>
        <Text style={styles.gameText}>Flyer Blocks</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/Inside/petDetailsScreen")}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E67C07",
    paddingVertical: 50,
  },
  backButton: {
    width: "70%",
    height: 60,
    backgroundColor: "#E62E07", // Vermelho forte para destaque
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Bordas mais arredondadas
    borderWidth: 2,
    borderColor: "#000", // Bordas pretas para contraste
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8, // Sombra mais intensa
    shadowRadius: 4,
    elevation: 8, // Elevação maior para mais destaque
    marginTop: 20,
  },
  backText: {
    fontSize: 20,
    fontFamily: "Minecraft",
    color: "#FFF", // Texto branco para visibilidade
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
