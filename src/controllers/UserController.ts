import { Request, Response } from 'express'
import { UserService } from '../services/UserService';

export class UserController {
    userService = new UserService();
    async createUser(request: Request, response: Response){
        try{
            const userCreated =  this.userService.createUser(request.body)
            return response.status(200).json(userCreated);
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async deleteUser(request: Request, response: Response){
        try{
            const userDeleted =  this.userService.deleteUser(request.body)
            if(!userDeleted){
                return response.status(404).json({ error: "User not found." })
            }else{
                return response.status(204).json(userDeleted);
            }    
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async getAllUsers(request: Request, response: Response){
        try{
            const users =  this.userService.getAllUsers()
            return response.status(200).json(users)  
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async getOneUser(request: Request, response: Response){
        const { id } = request.params;
        try{
            const user =  this.userService.getOneUser(Number(id))
            if(!user){
                return response.status(404).json({ error: "User not found." })
            }else{
                return response.status(200).json(user) 
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async updateUser(request: Request, response: Response){
        const { id } = request.params;
        try{
            const updatedUser =  this.userService.updateUser(request.body, Number(id))
            if(!updatedUser){
                return response.status(404).json({ error: "User not found." })
            }else{
                return response.status(200).json(updatedUser) 
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async patchUser(request: Request, response: Response){
        const { id } = request.params;
        try{
            const updatedUser =  this.userService.patchUser(request.body, Number(id))
            if(!updatedUser){
                return response.status(404).json({ error: "User not found." })
            }else{
                return response.status(200).json(updatedUser) 
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
}