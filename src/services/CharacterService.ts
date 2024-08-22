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
                include: { characters: {
                    include: {
                        abilityCheck: true,
                        attributes: true,
                        inventory: true,
                        savingThrows: true,
                        spellLevel0: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel1: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel2: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel3: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel4: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel5: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel6: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel7: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel8: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel9: {
                            include: {
                                spells: true,
                            }
                        },
                        weapons: true
                    }
                } },
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
                                create: {
                                    totalSpells: spellLevel0.totalSpells,
                                    usedSpells: spellLevel0.usedSpells,
                                    spells: {
                                        create: spellLevel0.spells
                                    }
                                }
                            },
                            spellLevel1: {
                                create: {
                                    totalSpells: spellLevel1.totalSpells,
                                    usedSpells: spellLevel1.usedSpells,
                                    spells: {
                                        create: spellLevel1.spells
                                    }
                                }
                            },
                            spellLevel2: {
                                create: {
                                    totalSpells: spellLevel2.totalSpells,
                                    usedSpells: spellLevel2.usedSpells,
                                    spells: {
                                        create: spellLevel2.spells
                                    }
                                }
                            },
                            spellLevel3: {
                                create: {
                                    totalSpells: spellLevel3.totalSpells,
                                    usedSpells: spellLevel3.usedSpells,
                                    spells: {
                                        create: spellLevel3.spells
                                    }
                                }
                            },
                            spellLevel4: {
                                create: {
                                    totalSpells: spellLevel4.totalSpells,
                                    usedSpells: spellLevel4.usedSpells,
                                    spells: {
                                        create: spellLevel4.spells
                                    }
                                }
                            },
                            spellLevel5: {
                                create: {
                                    totalSpells: spellLevel5.totalSpells,
                                    usedSpells: spellLevel5.usedSpells,
                                    spells: {
                                        create: spellLevel5.spells
                                    }
                                }
                            },
                            spellLevel6: {
                                create: {
                                    totalSpells: spellLevel6.totalSpells,
                                    usedSpells: spellLevel6.usedSpells,
                                    spells: {
                                        create: spellLevel6.spells
                                    }
                                }
                            },
                            spellLevel7: {
                                create: {
                                    totalSpells: spellLevel7.totalSpells,
                                    usedSpells: spellLevel7.usedSpells,
                                    spells: {
                                        create: spellLevel7.spells
                                    }
                                }
                            },
                            spellLevel8: {
                                create: {
                                    totalSpells: spellLevel8.totalSpells,
                                    usedSpells: spellLevel8.usedSpells,
                                    spells: {
                                        create: spellLevel8.spells
                                    }
                                }
                            },
                            spellLevel9: {
                                create: {
                                    totalSpells: spellLevel9.totalSpells,
                                    usedSpells: spellLevel9.usedSpells,
                                    spells: {
                                        create: spellLevel9.spells
                                    }
                                }
                            },
                            history,
                            notes,
                            abilityCheck: {
                                create: abilityCheck
                            },
                            savingThrows: {
                                create: savingThrows
                            }
                        },
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
                spellLevel0: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel1: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel2: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel3: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel4: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel5: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel6: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel7: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel8: {
                    include: {
                        spells: true,
                    }
                },
                spellLevel9: {
                    include: {
                        spells: true,
                    }
                },
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
                    user: false,
                    abilityCheck: true,
                    attributes: true,
                    inventory: true,
                    savingThrows: true,
                    spellLevel0: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel1: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel2: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel3: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel4: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel5: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel6: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel7: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel8: {
                        include: {
                            spells: true,
                        }
                    },
                    spellLevel9: {
                        include: {
                            spells: true,
                        }
                    },
                    weapons: true
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
                            totalSpells: spellLevel0?.totalSpells,
                            usedSpells: spellLevel0?.usedSpells,
                            spells: {
                                upsert: spellLevel1.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        }, 
                    },
                    spellLevel1: {
                        update: {
                            totalSpells: spellLevel1?.totalSpells,
                            usedSpells: spellLevel1?.usedSpells,
                            spells: {
                                upsert: spellLevel1.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        }
                    },
                    spellLevel2: {
                        update: {
                            totalSpells: spellLevel2?.totalSpells,
                            usedSpells: spellLevel2?.usedSpells,
                            spells: {
                                upsert: spellLevel2.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        }  
                    },
                    spellLevel3: {
                        update: {
                            totalSpells: spellLevel3?.totalSpells,
                            usedSpells: spellLevel3?.usedSpells,
                            spells: {
                                upsert: spellLevel3.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        }, 
                    },
                    spellLevel4: {
                        update: {
                            totalSpells: spellLevel4?.totalSpells,
                            usedSpells: spellLevel4?.usedSpells,
                            spells: {
                                upsert: spellLevel4.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        },
                    },
                    spellLevel5: {
                        update: {
                            totalSpells: spellLevel5?.totalSpells,
                            usedSpells: spellLevel5?.usedSpells,
                            spells: {
                                upsert: spellLevel5.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        },
                    },
                    spellLevel6: {
                        update: {
                            totalSpells: spellLevel6?.totalSpells,
                            usedSpells: spellLevel6?.usedSpells,
                            spells: {
                                upsert: spellLevel6.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        },
                    },
                    spellLevel7: {
                        update: {
                            totalSpells: spellLevel7?.totalSpells,
                            usedSpells: spellLevel7?.usedSpells,
                            spells: {
                                upsert: spellLevel7.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        },
                    },
                    spellLevel8: {
                        update: {
                            totalSpells: spellLevel8?.totalSpells,
                            usedSpells: spellLevel8?.usedSpells,
                            spells: {
                                upsert: spellLevel8.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                            })   
                        }
                        },  
                    },
                    spellLevel9: {
                        update: {
                            totalSpells: spellLevel9?.totalSpells,
                            usedSpells: spellLevel9?.usedSpells,
                            spells: {
                                upsert: spellLevel9.spells?.map((i: { id: any; }) => {
                                    return {
                                        create: i,
                                        update: i,
                                        where: { id: i.id ?? -1 }
                                    }
                                })   
                            }
                        }, 
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