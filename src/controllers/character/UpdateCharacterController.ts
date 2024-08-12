import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateCharacterController {
    async handle(request: Request, response: Response){

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
        } = request.body

        const { userId, characterId } = request.params

        const prismaClient = new PrismaClient()

        try{
            const user = await prismaClient.user.findUnique({
                where: { id: Number(userId) }
            })
            if(user !== null){
                const user =  await prismaClient.user.update({
                    where: { id: Number(userId) },
                    data: {
                        characters: {
                            update : {
                                data: {
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
                                    }, 
                                }
                            }
                        },
                    }
                });
                
                return response.status(200).json(user)
            }else{
                return response.status(404)
            }

            
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
}