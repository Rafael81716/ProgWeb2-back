import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class GetOneUserController {
    async handle(request: Request, response: Response){
        const { userId, characterId } = request.params

        try {
            const character = await prismaClient.character.delete({
                where: { 
                    id: Number(characterId),
                    userId: Number(userId),
                }
            })
            
            return response.status(204).json(character)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching the question." })
        }
    }
}