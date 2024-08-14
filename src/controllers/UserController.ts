import { Request, Response } from 'express'
import { UserService } from '../services/UserService';
import { userSchema } from '../validation/UserSchema';

export class UserController {
    async createUser(request: Request, response: Response){
        try{
            const validated = userSchema.validate(request.body);
            if(!validated.error){
                const userService = new UserService();
                const userCreated = await userService.createUser(request.body)
                console.log(userCreated)
                return response.status(200).json(userCreated);
            }else{
                return response.status(400).json({ error: "Input Error" })
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async deleteUser(request: Request, response: Response){
        const { id } = request.params;
        try{
            const userService = new UserService();
            const userDeleted = await userService.deleteUser(Number(id))
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
            const userService = new UserService();
            const users = await userService.getAllUsers()
            return response.status(200).json(users)  
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async getOneUser(request: Request, response: Response){
        const { id } = request.params;
        try{
            const userService = new UserService();
            const user = await userService.getOneUser(Number(id))
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
            const validated = userSchema.validate(request.body);
            if(!validated.error){
                const userService = new UserService();
                const updatedUser = await userService.updateUser(request.body, Number(id))
                if(!updatedUser){
                    return response.status(404).json({ error: "User not found." })
                }else{
                    return response.status(200).json(updatedUser) 
                }
            }else{
                return response.status(400).json({ error: "Input Error" })
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
    async patchUser(request: Request, response: Response){
        const { id } = request.params;
        try{
            const validated = userSchema.validate(request.body);
            if(!validated.error){
                const userService = new UserService();
                const updatedUser =  await userService.patchUser(request.body, Number(id))
                if(!updatedUser){
                    return response.status(404).json({ error: "User not found." })
                }else{
                    return response.status(200).json(updatedUser) 
                }
            }else{
                return response.status(400).json({ error: "Input Error" })
            }
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
}