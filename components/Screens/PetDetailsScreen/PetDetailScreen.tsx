import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from './ProgressBar';
import { useRouter } from 'expo-router';
import { Tamagotchi, dbOperations } from '@/dataBase/db.operations';
import { AppState } from 'react-native';
import { useRoute } from '@react-navigation/native';

const petData: Record<string, any> = {
  '1': require('@/assets/images/gifImgs/rabbitTamagotchi.gif'),
  '2': require('@/assets/images/gifImgs/mouseTamagotchi.gif'),
  '3': require('@/assets/images/gifImgs/monkeyTamagotchi.gif'),
  '4': require('@/assets/images/gifImgs/catTamagochi.gif'),
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CRITICAL':
      return '#ff0000'
    case 'VERY SAD':
      return '#ff4500'
    case 'SAD':
      return '#ff8c00'
    case 'OK':
      return '#ffff00'
    case 'GOOD':
      return '#32cd32'
    case 'VERY GOOD':
      return '#00ff00'
    default:
      return '#FFFFFF'
  }
}

const width = Dimensions.get('window').width; //full width
 
const PetDetailScreen = () => {
  const router = useRouter()
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [hunger, setHunger] = useState<number>(100)
  const [sleep, setSleep] = useState<number>(100)
  const [fun, setFun] = useState<number>(100)
  const [status, setStatus] = useState<string>('GOOD')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>("")
  const [statusZero, setStatusZero ] = useState<boolean>(false)
  
  const db = dbOperations()
  const route = useRoute()

  // search tamagotchi in the database
  const loadData = async () => {
    setLoading(true)
    try {
      const dataT = await db.findById(1) // will always be 1
      setTamagotchi(dataT)
      if (dataT) {
        setHunger(dataT.hunger)
        setSleep(dataT.sleepiness)
        setFun(dataT.fun)
      }
    }catch(err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect( () => {
    if(tamagotchi) { 
      console.log("loaded: ",tamagotchi) 
    }
  },[tamagotchi])
  

  // get tamagotchi img
  useEffect(() => {
    const loadSelectedPet = async () => {
      try {
        const petId = await AsyncStorage.getItem('@selectedPet')
        if (petId) {
          setSelectedPet(petId)
        }
        await loadData()
      } catch (error) {
        console.log('load pet error:', error)
      }
    }
    loadSelectedPet()
  }, [])

  // decrement logic
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => Math.max(prev - 1, 0))
      setSleep((prev) => Math.max(prev - 1, 0))
      setFun((prev) => Math.max(prev - 1, 0))
    }, 1000);

    return () => clearInterval(interval)
  }, [])

  useEffect( ()=> {
    checkStatusZero()
  }, [statusZero])

  // status control logic
  useEffect(() => {
    const total = hunger + sleep + fun
    if (total === 0) {
      setStatus('DEAD')
      setModalText("Your Tamagotchi is DEAD. Restart the game, please")
      setStatusZero(true)
      db.deleteTamagotchiFromDatabase()
    } else if (total <= 50) {
      setStatus('CRITICAL');
    } else if (total <= 100) {
      setStatus('VERY SAD');
    } else if (total <= 150) {
      setStatus('SAD');
    } else if (total <= 200) {
      setStatus('OK');
    } else if (total <= 250) {
      setStatus('GOOD');
    } else {
      setStatus('VERY GOOD')
    }
  }, [hunger, sleep, fun])

  const checkStatusZero = () => {
    if(statusZero === true) {
      setModalVisible(true)
    }
    return null
  }

  // update database with news satates
  const saveData = async () => {
    if (tamagotchi) {
      try {
        await db.updateTamagotchi({
          ...tamagotchi,
          hunger,
          sleepiness: sleep,
          fun,
        })
        console.log('date saved successfully.')
      } catch (err) {
        console.error('error saving data: ', err)
      }
    }
  }

  // app state control and save data
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        saveData()
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [hunger, sleep, fun, tamagotchi])

  // add feed progress
  const handleFeed = () => {
    setHunger((prev) => Math.min(prev + 10, 100))
  }

  // add sleep progress
  const handleSleep = () => {
    setSleep((prev) => Math.min(prev + 10, 100))
  }

  const handlePlay = () => {
    router.push('/gameScreen')
  }

  const closeModal = () => {
    setModalVisible(false)
    router.replace("/")
  }

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
      <Text style={styles.title}>Hello, {tamagotchi?.name}!</Text>

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

        <Text style={[styles.statsText, { color: getStatusColor(status) }]}>
          Status: {status}
        </Text>
      </View>

      {selectedPet && petData[selectedPet] ? (
        <Image source={petData[selectedPet]} style={styles.petImage} />
      ) : (
        <Text style={styles.statsText}>Pet not found!</Text>
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
    backgroundColor: '#E67C07',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    padding: 8,
    fontFamily: 'Minecraft',
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E62E07',
    borderRadius: 5,
    elevation: 5,
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    borderColor: "#000",
    borderWidth: 1.2
  },
  statsContainer: {
    width: '100%',
    backgroundColor: '#575757',
    borderRadius: 10,
    padding: 16,
    marginBottom: 2,
    elevation: 5,
    opacity: 0.8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  statsText: {
    color: '#FFFFFF',
    fontFamily: 'Minecraft',
    fontSize: 18,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  percentageText: {
    color: '#FFFFFF',
    fontFamily: 'Minecraft',
    fontSize: 18,
  },
  petImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#B91D1D',
    alignSelf: "stretch",
    width: width,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#575757",
    borderRadius: 8,
    alignItems: 'center',
  },
  actionIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  modalView:{
    height: 200,
    marginVertical: "auto",
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewTextModal: {
    textAlignVertical: "center"
  },
  modalText: {
    fontFamily: "Minecraft",
    fontSize: 18,
    color: "#000",
  },
  closemodal: {
    backgroundColor: 'red',
    width: '8%',
    borderRadius: 5,
    padding: 5,
    position: 'absolute',
    left: '100%',
    top: 10,
    zIndex: 10,
  },
  closemodaltext: {
    textAlign: 'center',
    fontFamily: 'Minecraft',
    color: '#FFF',
  },
})

export default PetDetailScreen;
