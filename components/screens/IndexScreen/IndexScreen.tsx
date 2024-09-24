import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, Modal, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { dbOperations } from  '../../../dataBase/db.operations'

import ProgressBar from '../../../components/screens/PetDetailsScreen/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProgress } from '../../../components/Progresso';

type Tamagochi = {
  id: number;
  name: string;
  fun: number;
  hunger: number;
  sleepiness: number;
  status: number;
  image: string;
};

export default function Welcome() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [hasTamagochi, setHasTamagochi] = useState(false);
  const productDatabase = dbOperations();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleD, setModalVisibleD] = useState(false);
  const [newStatus, setNewStatus] = useState<number>(0);
  const [fun1, setFun1] = useState<number>(0);
  const [hunger1, setHunger1] = useState<number>(0);
  const [sleep1, setSleep1] = useState<number>(0);
  const [name, setName] = useState("");
  const [tamagochis, setTamagochis] = useState<Tamagochi[]>([]);
  const [ejectId, setEjectId] = useState<number | null>(null);

  const getStatusText = (status: number) => { 
    if (status === 0) return 'DEAD';
    if (status <= 50) return 'CRITICAL';
    if (status <= 100) return 'VERY SAD';
    if (status <= 150) return 'SAD';
    if (status <= 200) return 'OK';
    if (status <= 250) return 'GOOD';
    return 'VERY GOOD';
   
  };
  
  const getColor = (status: number) => {
    if (status <= 50) return '#ff0000';
    if (status <= 150) return '#ffff00';
    return '#00ff6e';
  };

  useEffect(() => {
    async function checkTamagochi() {
      const tamagochisData = await productDatabase.loadAllTamagotchis() as unknown as Tamagochi[];
      setTamagochis(tamagochisData);
      setHasTamagochi(tamagochisData.length > 0);
    }
    checkTamagochi();
  }, [productDatabase]);

  const cadastrar = () => {
    router.push('/chooseScreen');
  };
  const handlePress = async (id: number) => {
    await AsyncStorage.setItem('tamagochiId', id.toString());
    console.log(`Saved tamagochiId: ${id}`);
    router.push('/Inside');
};

  return (
    <View style={styles.container}>
      <View style={styles.containerPrincipal}>
        <Text style={styles.Title}>TAMAGOTCHIS</Text>
        <View style={styles.alinhar}>
          <TouchableOpacity style={styles.bttIniciar2} onPress={cadastrar}>
            <Text style={styles.title3}>ADD</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          {tamagochis.map((item) => {
            const totalStatus = item.hunger + item.sleepiness + item.fun;
            const statusText = getStatusText(totalStatus);
            const textColor = getColor(totalStatus);
            let imageSource;
              switch (item.image) {
                case '1':
                  imageSource = require('../../../assets/images/staticImgs/rabbitTamagotchi.png');
                  break;
                case '2':
                  imageSource = require('../../../assets/images/staticImgs/mouseTamagotchi.png');
                  break;
                case '3':
                  imageSource = require('../../../assets/images/staticImgs/monkeyTamagotchi.png');
                  break;
                case '4':
                  imageSource = require('../../../assets/images/staticImgs/catTamagochi.png');
                  break;
                default:
                  imageSource = null;
              }
            

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.containerProgresso}
                onPress={() => handlePress(item.id)}>
                <View key={item.id}>
                  <View style={styles.alinharcontainer2}>
                    <View style={styles.containerImage}>
                      <Image source={imageSource} style={styles.tamagochiImage} />
                      <View style={styles.alinharNS}>
                        <Text style={styles.tamagochiName}>{item.name}</Text>
                        <Text style={[styles.tamagochiStatus, { color: textColor }]}>{statusText}</Text>
                      </View>
                    </View>
                    <View style={styles.containerbarras}>
                      <View style={styles.alinharcontainer}>
                        <View style={styles.alinharbarra}>
                        <Text style={styles.dadosI}>Fun</Text>
                        <Text style={styles.dados}>{item.fun}%</Text>
                        </View>
                      </View>
                      <View style={styles.alinharcontainer}>
                        <View style={styles.alinharbarra2}>
                        <Text style={styles.dadosI}>Hunger</Text>
                        <Text style={styles.dados}>{item.hunger}%</Text>
                        </View>
                      </View>
                      <View style={styles.alinharcontainer}>
                        <View style={styles.alinharbarra3}>
                        <Text style={styles.dadosI}>Sleep</Text>
                          <Text style={styles.dados}>{item.sleepiness}%</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alinhar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  containerbarras:{
  width:'65%',
  height:'80%',
  zIndex:10,
  },
  container: {
    flex: 1,
    backgroundColor: '#E67C07',
  },
  containerPrincipal: {
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
    paddingBottom: 20,
    marginTop: 20,
  },
  containerProgresso: {
    width: '90%',
    backgroundColor: '#E62E07',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1.5,
    alignSelf: 'center',
    marginTop:20,
    marginBottom:20,
    flex:1,
  },
  alinharcontainer: {
    alignItems: 'center',
    marginBottom: 5,
    left: 30,
  },


  alinharcontainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  alinharNS: {
    zIndex: 2,
    top:5,
    alignSelf: 'center',
  },
  alinharbarra: {
    marginTop:10,
    width:'70%',
    marginBottom:10,
    flexDirection:'row',
    backgroundColor:'#575757',
    padding:5,
    borderRadius:5,
  },
  alinharbarra2: {
    top: 3,
    width:'70%',
    marginBottom:10,
    flexDirection:'row',
    backgroundColor:'#575757',
    padding:5,
    borderRadius:5,
  },
  alinharbarra3: {
    top: 5,
    width:'70%',
    marginBottom:40,
    flexDirection:'row',
    backgroundColor:'#575757',
    padding:5,
    borderRadius:5,
  },
  dados:{
   fontFamily:'Minecraft',
   color:'white',
   fontSize:18,
   width:'40%',
   textAlign:'center',

  },
  dadosI:{
    fontFamily:'Minecraft',
    color:'white',
    fontSize:18,
    width:'60%',
    textAlign:'left',
    marginRight:5,
   },
  containerImage: {
    width: '30%',
    height: '50%',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '100%',
  },
  Title: {
    fontFamily: 'Minecraft',
    fontSize: 45,
    marginTop: 100,
    color: '#ffff',
    backgroundColor: '#E62E07',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    padding: 12,
    paddingTop: 20,
  },
  bttIniciar2: {
    width: '40%',
    alignContent: 'center',
    marginTop: 50,
    backgroundColor: '#E62E07',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    padding: 10,
  },
  bttIniciar3: {
    width: '40%',
    alignContent: 'center',
    marginTop: 50,
    backgroundColor: 'black',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    padding: 10,
  },
  tamagochiList: {
    marginTop: 10,
    width: '90%',

  },
  tamagochiName: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Minecraft',
    alignSelf: 'center',
    top:-20,
  },
  tamagochiFun: {
    color: '#ccc',
    fontSize: 16,
  },
  tamagochiHunger: {
    color: '#ccc',
    fontSize: 16,
  },
  tamagochiSleep: {
    color: '#ccc',
    fontSize: 16,
  },
  tamagochiImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    top:-20,

  },
  tamagochiStatus: {
    fontFamily: 'Minecraft',
    textAlign: 'center',
    top:-15,
  },
  title3: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Minecraft',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

});