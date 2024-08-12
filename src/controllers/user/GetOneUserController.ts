import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class GetOneUserController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {
            const user = await prismaClient.user.findUnique({
                where: { id: Number(id) },
                include: {
                    characters: true
                }
            })

            if (!user) {
                return response.status(404).json({ error: "User not found." })
            }

            return response.status(200).json(user)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching the question." })
        }
    }
}