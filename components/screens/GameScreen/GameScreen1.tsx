import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; 


const TicTacToe = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const navigation = useNavigation(); 
  // Função para lidar com a jogada
  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Função para verificar se há vencedor ou empate
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
      Alert.alert("Game Over", `The winner is: ${winner}`);
    } else if (!board.includes(null)) {
      Alert.alert("Draw", "The game ended in a draw!");
    }
  }, [board]);

  // Função para renderizar um quadrado
  const renderSquare = (index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.square}
      onPress={() => handlePress(index)}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  // Função para reiniciar o jogo
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {[...Array(9)].map((_, index) => renderSquare(index))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      {/* Botão para voltar à tela de detalhes */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

// Função para verificar o vencedor
const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E67C07",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    fontSize: 36,
    fontFamily: "Minecraft",
  },
  status: {
    fontSize: 24,
    fontFamily: "Minecraft",
    color: "#FFF",
  },
  resetButton: {
    backgroundColor: "#E62E07",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  resetText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Minecraft",
  },
  backButton: {
    backgroundColor: "#07A2E07",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Minecraft",
  },
});

export default TicTacToe;
