import { getDBConnection } from "./db.connection"
import { Tamagotchi } from "@/models/Tamagotchi"

export async function initDatabase() {
    const db = await getDBConnection()
    const query = `CREATE TABLE IF NOT EXISTS Tamagotchi (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        hunger INTEGER NOT NULL,
        sleepiness INTEGER NOT NULL,
        fun INTEGER NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL );`
    try{
        await db.execAsync(query)
        console.log("created!")
    }catch(err) {
        throw console.log("F demais", err)
    }
}

export async function createTamagotchi(data: Tamagotchi){
    const db = await getDBConnection()
    const statement = await db.prepareAsync(
        ` INSERT INTO Tamagotchi (name, hunger, sleepiness, fun, createdAt, updatedAt)
          VALUES ($name, $hunger, $sleepiness, $fun, $createdAt, $updatedAt)`
    )
    try{
        let result =  await statement.executeAsync({
            $name: data.getName(),
            $hunger: data.getHunger(),
            $sleepiness: data.getSleepiness(),
            $fun: data.getFun(),
            $createdAt: data.getCreatedAt(),
            $updatedAt: data.getUpdatedAt()
        })
        console.log("result", result)
    }catch(err) {
        console.log(err)
    } finally {
        await statement.finalizeAsync()
    }
}

export async function loadDatabaseTamagotchi() {
    const db = await getDBConnection()
    try { 
      const query: string  = `SELECT * FROM Tamagotchi`  
      const result = await db.getFirstAsync(query)
      const tamagotchiT: Tamagotchi = result as Tamagotchi
      console.log("Teste:", tamagotchiT)
      return tamagotchiT
    }catch(err){
      console.log("japonesGay", err)
    } 
  }

export async function findTamagotchi() {
    const db = await getDBConnection()
    const query = `SELECT name FROM Tamagotchi`
    try {
        const response = await db.getFirstAsync(query)
        if(response){
            return true
        }
        return false
    } catch (err) {
        throw err
    } 
}