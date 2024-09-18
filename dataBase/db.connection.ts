import { SQLiteDatabase } from 'expo-sqlite'


// create and init database
export async function initDatabase(db: SQLiteDatabase) {

    const query = `CREATE TABLE IF NOT EXISTS Tamagotchi (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        hunger INTEGER NOT NULL,
        sleepiness INTEGER NOT NULL,
        fun INTEGER NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP);`
        try{
            await db.execAsync(query)
            console.log("Database initialized!")
        }catch(err) {
            throw console.log("F demais", err)
        }
}
