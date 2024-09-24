import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ImageBase,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from "./ProgressBar";
import { useFocusEffect, useRouter } from "expo-router";
import { Tamagotchi, dbOperations } from "@/dataBase/db.operations";
import { AppState } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useProgress } from "@/components/Progresso";

const petData: Record<string, any> = {
  "1": require("@/assets/images/gifImgs/rabbitTamagotchi.gif"),
  "2": require("@/assets/images/gifImgs/mouseTamagotchi.gif"),
  "3": require("@/assets/images/gifImgs/monkeyTamagotchi.gif"),
  "4": require("@/assets/images/gifImgs/catTamagochi.gif"),
};
const width = Dimensions.get("window").width;

const PetDetailScreen = () => {
  const router = useRouter();
  const { hunger, sleep, fun, status, setInitialValues } = useProgress();
  const { incrementFun, incrementHunger, incrementSleep} = useProgress();
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [tamagochiId, setTamagochiId] = useState<number | null>(null);
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi | null>(null);
  const [tamagotchiImage, setTamagotchiImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imageT, setImageT] = useState<string>("");
  const [statusZero, setStatusZero] = useState<boolean>(false);
  const [tipo, setTipo] = useState<string>("");

  const db = dbOperations();
  const getTamagochiId = async () => {
    try {
      const id = await AsyncStorage.getItem("tamagochiId");
      if (id) {
        setTamagochiId(Number(id));
      }
    } catch (error) {
      console.error("Erro ao ler Tamagotchi ID:", error);
    }
  };
  async function TrazerDados() {
    try {
      if (tamagochiId) {
        const data = await db.findById(tamagochiId);
        if (data) {
          setName(data.name);
          setTipo(data.image);
          setInitialValues({
            hunger: data.hunger ?? 100,
            sleep: data.sleepiness ?? 100,
            fun: data.fun ?? 100,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching Tamagotchi name:", error);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
     getTamagochiId();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      TrazerDados();
    }, [tamagochiId])
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const calculateStatus = () => {
    if (status <= 50) return { text: "DEAD", color: "#ff0000" };
    if (status <= 100) return { text: "CRITICAL", color: "#ff0000" };
    if (status <= 150) return { text: "VERY SAD", color: "#ffff00" };
    if (status <= 200) return { text: "SAD", color: "#ffff00" };
    if (status <= 250) return { text: "GOOD", color: "#00ff6e" };
    return { text: "VERY GOOD", color: "#00ff6e" };
  };

  const { text: statusText, color: statusColor } = calculateStatus();

  const close = () => {
    setModalVisible(false);
  };
  const saveData = async () => {
    try {
      if (tamagochiId !== null) {
        await db.updateTamagotchi(tamagochiId, {
          hunger: hunger ?? 100,
          fun: fun ?? 100,
          sleepiness: sleep ?? 100,
          id: tamagochiId,
          image: tipo,
        });
        console.log("Dados salvos com sucesso!");
        incrementHunger(10)
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };
  const saveData2 = async () => {
    try {
      if (tamagochiId !== null) {
        await db.updateTamagotchi(tamagochiId, {
          hunger: hunger ?? 100,
          fun: fun ?? 100,
          sleepiness: sleep ?? 100,
          id: tamagochiId,
          image: tipo,
        });
        console.log("Dados salvos com sucesso!"); 
        
        incrementSleep(10)
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };
  const handleFeed = () => {
    saveData();
  }

  
  const handleSleep = () => {
    
    saveData2();
  }

  const handlePlay = () => {
    // bota la dentro incrementFun(10)
    router.push('/Inside/gameScreen')
    saveData();
  }


  useEffect(() => {
    let imageSource;
    switch (tipo) {
      case "1":
        imageSource = require("../../../assets/images/gifImgs/rabbitTamagotchi.gif");
        break;
      case "2":
        imageSource = require("../../../assets/images/gifImgs/mouseTamagotchi.gif");
        break;
      case "3":
        imageSource = require("../../../assets/images/gifImgs/monkeyTamagotchi.gif");
        break;
      case "4":
        imageSource = require("../../../assets/images/gifImgs/catTamagochi.gif");
        break;
      default:
    }
    setTamagotchiImage(imageSource);
  }, [db]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
      <Modal 
      transparent={true} 
      visible={modalVisible} 
      animationType="slide" 
      onRequestClose={() => {closeModal}} 
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closemodal} onPress={(closeModal)}>
              <Text style={styles.closemodaltext}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}> 
              {modalText}
          </Text>
        </View>
      </Modal>
      <Text style={styles.title}>Hello, {name}!</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statsText}>Hunger</Text>
          <Text style={styles.percentageText}>{hunger}%</Text>
        </View>
        <ProgressBar progress={hunger / 100} color="#ff0000" />

        <View style={styles.statRow}>
          <Text style={styles.statsText}>Sleep</Text>
          <Text style={styles.percentageText}>{sleep}%</Text>
        </View>
        <ProgressBar progress={sleep / 100} color="#0000FF" />

        <View style={styles.statRow}>
          <Text style={styles.statsText}>Fun</Text>
          <Text style={styles.percentageText}>{fun}%</Text>
        </View>
        <ProgressBar progress={fun / 100} color="#00ff00" />

        <Text style={[styles.statsText, { color: statusColor }]}>
          Status: {statusText}
        </Text>
      </View>

      {selectedPet ? (
        <Text style={styles.statsText}>Pet not found!</Text>
      ) : (
        <Image source={tamagotchiImage} style={styles.petImage} />
      )}


      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSleep}>
          <Image source={require('@/assets/images/sleepButton.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handlePlay}>
          <Image source={require('@/assets/images/toPlayButton.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleFeed}>
          <Image source={require('@/assets/images/toFeedButton.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
      </>
      )}
      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E67C07",
    alignItems: "center",
    padding: 16,
  },
  title: {
    padding: 8,
    fontFamily: "Minecraft",
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
    backgroundColor: "#E62E07",
    borderRadius: 5,
    elevation: 5,
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    borderColor: "#000",
    borderWidth: 1.2,
  },
  statsContainer: {
    width: "100%",
    backgroundColor: "#575757",
    borderRadius: 10,
    padding: 16,
    marginBottom: 2,
    elevation: 5,
    opacity: 0.8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  statsText: {
    color: "#FFFFFF",
    fontFamily: "Minecraft",
    fontSize: 18,
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  percentageText: {
    color: "#FFFFFF",
    fontFamily: "Minecraft",
    fontSize: 18,
  },
  petImage: {
    width: 300,
    height: 400,
    resizeMode: "contain",
    marginBottom: 50,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#B91D1D",
    alignSelf: "stretch",
    width: width,
    padding: 20,
    position: "absolute",
    bottom: 0,
    elevation: 5,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#575757",
    borderRadius: 8,
    alignItems: "center",
  },
  actionIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  modalView: {
    height: 200,
    marginVertical: "auto",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewTextModal: {
    textAlignVertical: "center",
  },
  modalText: {
    fontFamily: "Minecraft",
    fontSize: 18,
    color: "#000",
  },
  closemodal: {
    backgroundColor: "red",
    width: "8%",
    borderRadius: 5,
    padding: 5,
    position: "absolute",
    left: "100%",
    top: 10,
    zIndex: 10,
  },
  closemodaltext: {
    textAlign: "center",
    fontFamily: "Minecraft",
    color: "#FFF",
  },
});

export default PetDetailScreen;
