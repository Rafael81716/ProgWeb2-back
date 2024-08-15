import { Request, Response } from 'express'
import { CharacterService } from '../services/CharacterService';
import { characterSchema, characterSchemaPatch } from '../validation/CharacterSchema'

export class CharacterController {
    

    async createCharacter(request: Request, response: Response){
        const { id } = request.params;

        try{
            const validated = characterSchema.validate(request.body);
            if(!validated.error){
                const characterService = new CharacterService();
                const responseOutput = await characterService.createCharacter(request.body, Number(id))
                
                if(responseOutput != null){
                    return response.status(201).json(responseOutput);
                }else{
                    return response.status(404).json();
                }
                }else{
                    console.log(validated.error.message)
                    return response.status(400).json({ error: validated.error.message })
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async deleteCharacter(request: Request, response: Response){
        const { userId, characterId } = request.params;

        try{
            const characterService = new CharacterService();
            const responseOutput = await characterService.deleteCharacter(Number(userId), Number(characterId))
            
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
            const characterService = new CharacterService();
            const responseOutput = await characterService.getOneCharacter(Number(userId), Number(characterId))
            
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
        const { userId } = request.params;

        try{
            const characterService = new CharacterService();
            const responseOutput = await characterService.getAllCharacters(Number(userId))
            
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
            const validated = characterSchema.validate(request.body);
            if(!validated.error){
                const characterService = new CharacterService();
                const responseOutput = await characterService.updateCharacter(request.body, Number(userId), Number(characterId))
                
                if(responseOutput != null){
                    return response.status(201).json(responseOutput);
                }else{
                    return response.status(404).json();
                }
            }else{
                return response.status(400).json({ error: validated.error.message })
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    } 
    async getAllCharactersFromAllUsers(request: Request, response: Response){
        try{
            const characterService = new CharacterService();
            const responseOutput = await characterService.GetAllCharactersFromAllUsers()
            
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