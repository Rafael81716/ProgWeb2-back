import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateUserController {
    async handle(request: Request, response: Response){

        const { email, password, username } = request.body

        const prismaClient = new PrismaClient()

        try{

            const user =  await prismaClient.user.create({
                data: {
                    email,
                    password,
                    username
                }
            });

            return response.status(200).json(user)
        }catch(error){
            console.error('Error creating User: ', error);
            return response.status(500).json({ error: "An error has ocurred while fetching the user." });
        }
    }    
}