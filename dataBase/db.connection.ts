import * as SQLite from 'expo-sqlite'

export async function getDBConnection(){
    return await SQLite.openDatabaseAsync("tamagotchi.db")
}