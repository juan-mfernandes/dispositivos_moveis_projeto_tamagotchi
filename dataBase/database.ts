import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSelectedPet = async (id: string) => {
    try {
        await AsyncStorage.setItem('@selectedPet', id);
    } catch (error) {
        console.log("Erro ao salvar o pet:", error);
    }
};

export const loadSelectedPet = async () => {
    try {
        const petId = await AsyncStorage.getItem('@selectedPet');
        return petId;
    } catch (error) {
        console.log("Erro ao carregar o pet:", error);
        return null;
    }
};
