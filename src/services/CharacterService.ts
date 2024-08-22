import { PrismaClient } from "@prisma/client";
import { UserService } from "./UserService";

export class CharacterService {
    prismaClient = new PrismaClient();
    userService = new UserService();

    async createCharacter(body: any, id: Number){
        const { 
            name,
            playerName,
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
            hitPointsActual,
            hitPointsMax,
            alignment,
            lifeDie,
            weapons,
            inventory,
            history,
            notes,
            abilityCheck,
            savingThrows,
            personalityTrait,
            proficiencyBonus,
            totalLifeDie,
            XP,
            bonds,
            conjurerAttribute,
            conjurerClass,
            ideals,
            inspiration,
            photo,
            proficiency,
            spellAttackModifier,
            temporaryHitPoints,
            talents,
            weakness,
            spellCD,
            spellLevel0,
            spellLevel1,
            spellLevel2,
            spellLevel3,
            spellLevel4,
            spellLevel5,
            spellLevel6,
            spellLevel7,
            spellLevel8,
            spellLevel9
        } = body


        const user = await this.prismaClient.user.findUnique({
            where: { id: Number(id) }
        })
        if(user){
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
                            hitPointsActual,
                            alignment,
                            hitPointsMax,
                            lifeDie,
                            playerName,
                            proficiencyBonus,
                            totalLifeDie,
                            XP,
                            personalityTrait,
                            bonds,
                            conjurerAttribute,
                            conjurerClass,
                            ideals,
                            inspiration,
                            photo,
                            proficiency,
                            spellAttackModifier,
                            temporaryHitPoints,
                            talents,
                            weakness,
                            spellCD,
                            weapons: {
                                create: weapons
                            },
                            inventory: {
                                create: inventory
                            },
                            spellLevel0: {
                                create: spellLevel0
                            },
                            spellLevel1: {
                                create: spellLevel1
                            },
                            spellLevel2: {
                                create: spellLevel2
                            },
                            spellLevel3: {
                                create: spellLevel3
                            },
                            spellLevel4: {
                                create: spellLevel4
                            },
                            spellLevel5: {
                                create: spellLevel5
                            },
                            spellLevel6: {
                                create: spellLevel6
                            },
                            spellLevel7: {
                                create: spellLevel7
                            },
                            spellLevel8: {
                                create: spellLevel8
                            },
                            spellLevel9: {
                                create: spellLevel9
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
        const char = await this.prismaClient.character.findUnique({
            where: { id: Number(characterId), userId: Number(userId) },
            include: {
                abilityCheck: true,
                attributes: true,
                inventory: true,
                savingThrows: true,
                spellLevel0: true,
                spellLevel1: true,
                spellLevel2: true,
                spellLevel3: true,
                spellLevel4: true,
                spellLevel5: true,
                spellLevel6: true,
                spellLevel7: true,
                spellLevel8: true,
                spellLevel9: true,
                user: false,
                weapons: true
            }
        })
        if (!char) {
            return null;
        }
        
        return char;
    }
    async getAllCharacters(userId: Number){
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
    async updateCharacter(body: any, userId: Number, characterId: Number){
        const { 
            name,
            playerName,
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
            hitPointsActual,
            hitPointsMax,
            alignment,
            lifeDie,
            weapons,
            inventory,
            history,
            notes,
            abilityCheck,
            savingThrows,
            personalityTrait,
            proficiencyBonus,
            totalLifeDie,
            XP,
            bonds,
            conjurerAttribute,
            conjurerClass,
            ideals,
            inspiration,
            photo,
            proficiency,
            spellAttackModifier,
            temporaryHitPoints,
            talents,
            weakness,
            spellCD,
            spellLevel0,
            spellLevel1,
            spellLevel2,
            spellLevel3,
            spellLevel4,
            spellLevel5,
            spellLevel6,
            spellLevel7,
            spellLevel8,
            spellLevel9
        } = body
        
        const user = await this.userService.getOneUser(userId  as number)
        if(user){
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
                    hitPointsActual,
                    alignment,
                    hitPointsMax,
                    lifeDie,
                    playerName,
                    proficiencyBonus,
                    totalLifeDie,
                    XP,
                    personalityTrait,
                    bonds,
                    conjurerAttribute,
                    conjurerClass,
                    ideals,
                    inspiration,
                    photo,
                    proficiency,
                    spellAttackModifier,
                    temporaryHitPoints,
                    talents,
                    weakness,
                    spellCD,
                    weapons: {
                        upsert: weapons.map((w: { id: any; }) => {
                            return {
                                create: w,
                                update: w,
                                where: { id: w.id ?? -1 }
                            }
                        })
                    },
                    inventory: {
                        upsert: inventory.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })
                    },
                    spellLevel0: {
                        update: {
                            totalSpells: spellLevel0.totalSpells,
                            usedSpells: spellLevel0.usedSpells,
                        },
                        upsert: spellLevel0.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel1: {
                        update: {
                            totalSpells: spellLevel1.totalSpells,
                            usedSpells: spellLevel1.usedSpells,
                        },
                        upsert: spellLevel1.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel2: {
                        update: {
                            totalSpells: spellLevel2.totalSpells,
                            usedSpells: spellLevel2.usedSpells,
                        },
                        upsert: spellLevel2.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel3: {
                        update: {
                            totalSpells: spellLevel3.totalSpells,
                            usedSpells: spellLevel3.usedSpells,
                        },
                        upsert: spellLevel3.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel4: {
                        update: {
                            totalSpells: spellLevel4.totalSpells,
                            usedSpells: spellLevel4.usedSpells,
                        },
                        upsert: spellLevel4.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel5: {
                        update: {
                            totalSpells: spellLevel5.totalSpells,
                            usedSpells: spellLevel5.usedSpells,
                        },
                        upsert: spellLevel5.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel6: {
                        update: {
                            totalSpells: spellLevel6.totalSpells,
                            usedSpells: spellLevel6.usedSpells,
                        },
                        upsert: spellLevel6.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel7: {
                        update: {
                            totalSpells: spellLevel7.totalSpells,
                            usedSpells: spellLevel7.usedSpells,
                        },
                        upsert: spellLevel7.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel8: {
                        update: {
                            totalSpells: spellLevel8.totalSpells,
                            usedSpells: spellLevel8.usedSpells,
                        },
                        upsert: spellLevel8.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
                    },
                    spellLevel9: {
                        update: {
                            totalSpells: spellLevel9.totalSpells,
                            usedSpells: spellLevel9.usedSpells,
                        },
                        upsert: spellLevel9.spells.map((i: { id: any; }) => {
                            return {
                                create: i,
                                update: i,
                                where: { id: i.id ?? -1 }
                            }
                        })   
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
    async GetAllCharactersFromAllUsers(){
        const characters = await this.prismaClient.character.findMany()
        
        return characters;
    }
    
}