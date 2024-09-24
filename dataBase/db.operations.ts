import { Image } from 'react-native';
import { useSQLiteContext } from "expo-sqlite"

export type Tamagotchi = {
    id: number,
    name: string,
    status?: number,
    hunger: number,
    fun: number,
    sleepiness: number,
    updatedAt: Date,
    image: string,
}

export function dbOperations() {
    const db = useSQLiteContext()

    async function createTamagotchi(data: Omit<Tamagotchi, "id">){
        const statement = await db.prepareAsync(
            ` INSERT INTO Tamagotchi (name, hunger, sleepiness, fun, updatedAt, image)
              VALUES ($name, $hunger, $sleepiness, $fun, $updatedAt, $image);`
        )
        try{
            const result =  await statement.executeAsync({
                $name: data.name,
                $hunger: 100,
                $sleepiness: 100,
                $fun: 100,
                $updatedAt: new Date().toISOString(),
                $image: data.image
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

    async function updateTamagotchi(id: number, data: Omit<Tamagotchi, "name" | "updatedAt">) {
        const statement = await db.prepareAsync(
            `UPDATE Tamagotchi SET hunger = $hunger, fun = $fun, sleepiness = $sleepiness WHERE id = $id`
        )
        try {
            await statement.executeAsync({
                $id: id,
                $hunger: data.hunger !== undefined ? data.hunger:null,
                $fun: data.fun !== undefined ? data.fun:null,
                $sleepiness: data.sleepiness !== undefined ? data.sleepiness:null
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

    async function deleteTamagotchiById(id: number) {
        const statement = await db.prepareAsync(
            `DELETE FROM Tamagotchi WHERE id = $id`
        )
        try {
            const result = await statement.executeAsync({
                $id: id
            });
            if (result.changes === 0) {
                console.log(`No Tamagotchi found with id: ${id}`);
            } else {
                console.log(`Tamagotchi with id: ${id} deleted!`);
            }
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            await statement.finalizeAsync();
        }
    }
    async function loadAllTamagotchis() {
        const query = `SELECT * FROM Tamagotchi;`
        try {
            const results = await db.getAllAsync<Tamagotchi>(query);
            return results;
        } catch (err) {
            console.log("Error loading Tamagotchis: ", err);
            throw err;
        }
    }
    

    function deleteTamagotchi(){
        const query = `DROP TABLE Tamagotchi`
            db.runSync(query)
            resetAutoIncrement()
            console.log("Tamagotchi deleted!")
    }
    
    return { createTamagotchi, loadDatabaseTamagotchi, updateTamagotchi, findById, deleteTamagotchiById, deleteTamagotchi, loadAllTamagotchis}

}