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

        const { id } = request.params

        const prismaClient = new PrismaClient()

        try{
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
/*
name String
  class String
  level Int
  background String
  race String
  attributeId Int @unique
  attributes Attributes @relation(fields: [attributeId], references: [id])
  armorClass Int
  initiative Int
  failCounter Int? @default(0)
  successCounter Int? @default(0)
  speed Int
  hitPoints Int
  weapons Weapon[]
  inventory Item[]
  spellCasting Spell[]
  history String?
  notes String?
  //Photo: IMG
  userId Int
  user User @relation(fields: [userId], references: [id]) */