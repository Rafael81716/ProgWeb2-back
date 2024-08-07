import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateBookController {
    async handle(request: Request, response: Response){

        const { email, password, username } = request.body

        const prismaClient = new PrismaClient()
        
        const user =  await prismaClient.user.create({
            data: {
                email,
                password,
                username
            }
        })

}
        return response.json(user)
    }    
}