import { useSQLiteContext } from "expo-sqlite"

export type Tamagotchi = {
    id: number,
    name: string,
    status?: number,
    hunger: number,
    fun: number,
    sleepiness: number,
    updatedAt: Date,
}

export function dbOperations() {
    const db = useSQLiteContext()

    async function createTamagotchi(data: Omit<Tamagotchi, "id" | "updatedAt" | "fun" | "hunger" | "sleepiness">){
        const statement = await db.prepareAsync(
            ` INSERT INTO Tamagotchi (name, hunger, sleepiness, fun, updatedAt)
              VALUES ($name, $hunger, $sleepiness, $fun, $updatedAt);`
        )
        try{
            const result =  await statement.executeAsync({
                $name: data.name,
                $hunger: 100,
                $sleepiness: 100,
                $fun: 100,
                $updatedAt: new Date().toISOString()
            })
        }catch(err) {
            console.log(err)
            throw err
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function loadDatabaseTamagotchi() {
        try { 
          const query: string  = `SELECT * FROM Tamagotchi LIMIT 1;`  
          const result = await db.getFirstAsync<Tamagotchi>(query)
          if(result === null) {
            console.log("Nothing to show")
          } else {
            console.log("Success: ", result)
          }
          return result
        }catch(err){
          console.log("errorLoadDatabase: ", err)
          throw err
        } 
    }

    async function updateTamagotchi(data: Omit<Tamagotchi, "name" | "updatedAt">) {
        const statement = await db.prepareAsync(
            `UPDATE Tamagotchi SET hunger = $hunger, fun = $fun, sleepiness = $sleepiness WHERE id = $id;`
        )
        try {
            const result = await statement.executeAsync({
                $hunger: data.hunger,
                $fun: data.fun,
                $sleepiness: data.sleepiness,
                $id: data.id
            });
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            statement.finalizeAsync()
        }
    }

    async function findById(id: number) {
        const query = `SELECT * FROM Tamagotchi WHERE id = ${id};` 
        try {
            const response = await db.getFirstAsync<Tamagotchi>(query)
            return response
        } catch (err) {
            throw err
        } 
    }

    function resetAutoIncrement() {
        const query = `UPDATE sqlite_sequence SET seq = 0 WHERE name = "Tamagotchi";` // the id returns to 1
        db.runSync(query)
        console.log("Success: Autoincrement deleted!")
    }

    function deleteTamagotchiFromDatabase(){
        const query = `DELETE from Tamagotchi WHERE id = 1`
            db.runSync(query)
            resetAutoIncrement()
            console.log("Tamagotchi deleted!")
    }
    
    return { createTamagotchi, loadDatabaseTamagotchi, updateTamagotchi, findById, deleteTamagotchiFromDatabase}

}