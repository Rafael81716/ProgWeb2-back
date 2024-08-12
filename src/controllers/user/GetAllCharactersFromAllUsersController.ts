import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class GetAllCharactersFromAllUsersController {
    async handle(request: Request, response: Response){

        try {
            const users = await prismaClient.user.findMany({
                include: {
                    characters: true
                }
            })
            const allCharacters = users.forEach((user) => {user.characters})
            return response.status(200).json(allCharacters)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching the question." })
        }
    }
}