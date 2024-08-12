import { Request, Response } from 'express'
import { CreateCharacterService } from '../../services/character/CreateCharacterService'

export class CreateCharacterController {
    async handle(request: Request, response: Response){
        const characterService = new CreateCharacterService();
        const { id } = request.params;
        try{
            const responseOutput =  characterService.handle(request.body, Number(id))
            
            if(responseOutput != null){
                return response.status(201).json(responseOutput);
            }else{
                return response.status(404).json();
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