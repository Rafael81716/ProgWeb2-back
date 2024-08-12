import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateCharacterService {
    async handle(body: any, id: Number){

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

        const prismaClient = new PrismaClient()

        const user = await prismaClient.user.findUnique({
            where: { id: Number(id) }
        })
        if(user !== null){
            const user =  await prismaClient.user.update({
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
}