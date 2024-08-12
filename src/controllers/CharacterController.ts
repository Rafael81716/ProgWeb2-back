import { Request, Response } from 'express'
import { CharacterService } from '../services/CharacterService';

export class characterController {
    characterService = new CharacterService();

    async createCharacter(request: Request, response: Response){
        const { id } = request.params;

        try{
            const responseOutput =  this.characterService.createCharacter(request.body, Number(id))
            
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