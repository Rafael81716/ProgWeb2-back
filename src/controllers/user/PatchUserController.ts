import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateUserController {
    async handle(request: Request, response: Response){

        const { email, password, username, characters } = request.body
        const { id } = request.params

        const prismaClient = new PrismaClient()

        try{

            const user =  await prismaClient.user.update({
                where: { id: Number(id) },
                data: {
                    ...(email && { email }),
                    ...(password && { password }),
                    ...(username && { username } ),
                    ...(characters && { characters })
                }
            });

            return response.status(200).json(user)
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
}