import { Request, Response } from 'express'
import { CharacterService } from '../services/CharacterService';

export class CharacterController {
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
    async deleteCharacter(request: Request, response: Response){
        const { userId, characterId } = request.params;

        try{
            const responseOutput =  this.characterService.deleteCharacter(Number(userId), Number(characterId))
            
            if(responseOutput != null){
                return response.status(204).json(responseOutput);
            }else{
                return response.status(404).json();
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async getOneCharacter(request: Request, response: Response){
        const { userId, characterId } = request.params;

        try{
            const responseOutput =  this.characterService.getOneCharacter(Number(userId), Number(characterId))
            
            if(responseOutput != null){
                return response.status(200).json(responseOutput);
            }else{
                return response.status(404).json();
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async getAllCharacters(request: Request, response: Response){
        const { id } = request.params;

        try{
            const responseOutput =  this.characterService.getAllCharacters(Number(id))
            
            if(responseOutput != null){
                return response.status(200).json(responseOutput);
            }else{
                return response.status(404).json();
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async updateCharacter(request: Request, response: Response){
        const { userId, characterId } = request.params;

        try{
            const responseOutput =  this.characterService.updateCharacter(request.body, Number(userId), Number(characterId))
            
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
    async getAllCharactersFromAllUsers(request: Request, response: Response){
        const { id } = request.params;

        try{
            const responseOutput =  this.characterService.GetAllCharactersFromAllUsers()
            
            if(responseOutput != null){
                return response.status(200).json(responseOutput);
            }else{
                return response.status(404).json();
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    } 
}