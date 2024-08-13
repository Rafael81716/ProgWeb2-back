import { PrismaClient } from "@prisma/client";
import { UserService } from "./UserService";

export class CharacterService {
    prismaClient = new PrismaClient();
    userService = new UserService();

    async createCharacter(body: any, id: Number){
        const { 
            name,
            charClass,
            level,
            background,
            race,
            attributes,
            armorClass,
            initiative,
            failCounter,
            successCounter,
            speed,
            hitPoints,
            weapons,
            inventory,
            spellCasting,
            history,
            notes,
            abilityCheck,
            savingThrows
        } = body


        const user = await this.prismaClient.user.findUnique({
            where: { id: Number(id) }
        })
        if(user !== null){
            const user =  await this.prismaClient.user.update({
                where: { id: Number(id) },
                data: {
                    characters: {
                        create : {
                            name,
                            class: charClass,
                            level,
                            background,
                            race,
                            attributes: {
                                create: attributes
                            },
                            armorClass,
                            initiative,
                            failCounter,
                            successCounter,
                            speed,
                            hitPoints,
                            weapons: {
                                create: weapons
                            },
                            inventory: {
                                create: inventory
                            },
                            spellCasting: {
                                create: spellCasting
                            },
                            history,
                            notes,
                            abilityCheck: {
                                create: abilityCheck
                            },
                            savingThrows: {
                                create: savingThrows
                            }
                        }
                    },
                }
            });
            return user;
        }else{
            return null;
        }
    }
    async getOneCharacter(userId: Number, characterId: Number){
        function containChar(char: any) {
            return Number(char.id) == Number(characterId)
        }

        const user = await this.prismaClient.user.findUnique({
            where: { id: Number(userId) },
            include: {
                characters: true
            }
        })
        if (!user) {
            return null;
        }
        if (!user?.characters.some(containChar)) {
            return null;
        }
        
        return user?.characters.filter(containChar)
    }
    async getAllCharacters(userId: Number){ //Consertar isso
        const user = await this.userService.getOneUser(Number(userId));
        if(user !== null){
            return user?.characters
        }else{
            return null;
        }
    }
    async deleteCharacter(userId: Number, characterId: Number){
        const character = this.getOneCharacter(userId, characterId);
        if(character != null){
            const deletedCharacter = await this.prismaClient.character.delete({
                where: { 
                    id: Number(characterId),
                    userId: Number(userId),
                }
            })
            

            return deletedCharacter;
        }else{
            return null;
        }
    }
    async updateCharacter(body: any, userId: Number, characterId: Number){ //consertar isso
        const { 
            name,
            charClass,
            level,
            background,
            race,
            attributes,
            armorClass,
            initiative,
            failCounter,
            successCounter,
            speed,
            hitPoints,
            weapons,
            inventory,
            spellCasting,
            history,
            notes,
            abilityCheck,
            savingThrows
        } = body
        
        const user = this.userService.getOneUser(userId)
        if(user !== null){
            const character =  await this.prismaClient.character.update({
                where: { id: Number(characterId), userId: Number(userId) },
                include: {
                    user: false
                },
                data: {
                    name,
                    class: charClass,
                    level,
                    background,
                    race,
                    attributes: {
                        update: attributes
                    },
                    armorClass,
                    initiative,
                    failCounter,
                    successCounter,
                    speed,
                    hitPoints,
                    weapons: {
                        update: weapons
                    },
                    inventory: {
                        update: inventory
                    },
                    spellCasting: {
                        create: spellCasting
                    },
                    history,
                    notes,
                    abilityCheck: {
                        update: abilityCheck
                    },
                    savingThrows: {
                        update: savingThrows
                    }
                }
            });
            
            return character;
        }else{
            return null;
        }
    }
    async GetAllCharactersFromAllUsers(){//Consertar isso
        const users = await this.prismaClient.user.findMany({
            include: {
                characters: true
            }
        })
        const allCharacters = users.forEach((user) => {user.characters})
        console.log(allCharacters)
        return allCharacters;
    }
    
}