import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class GetOneUserController {
    async handle(request: Request, response: Response){

        try {
            const users = await prismaClient.user.findMany({
                include: {
                    characters: true
                }
            })
            return response.status(200).json(users)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching the question." })
        }
    }
}