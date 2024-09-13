export class Tamagotchi {
    public name: string
    public hunger: number = 100
    public sleepiness: number = 100
    public fun: number = 100
    public status: string = 'GOOD'
    public createdAt: string = Date.now().toString()
    public updatedAt: string

    constructor( name: string, hunger: number, sleepiness: number, fun: number, status: string, createdAt: string, updatedAt: string){
        this.name = name,
        this.hunger = hunger,
        this.sleepiness = sleepiness,
        this.fun = fun,
        this.status = status,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
    }

    // behaviors
    // comming...

    // getters and setters
    public getName(): string {
        return this.name
    }

    public setName(name: string) {
        this.name = name
    }

    public getHunger(): number {
        return this.hunger
    }

    public setHunger(hunger: number) {
        this.hunger = hunger
    }

    public getSleepiness(): number {
        return this.sleepiness
    }

    public setSleepiness(sleepiness: number) {
        this.sleepiness = sleepiness
    }

    public getFun(): number {
        return this.fun
    }

    public setFun(fun: number) {
        this.fun = fun
    }

    public getStatus(): string {
        return this.status
    }

    public setStatus(status: string) {
        this.status = status
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

}
