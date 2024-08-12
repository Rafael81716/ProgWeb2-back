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
                const character =  await prismaClient.character.update({
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
                
                return response.status(200).json(character)
            }else{
                return response.status(404)
            }

            
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
}