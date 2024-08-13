import { PrismaClient } from '@prisma/client'

export class UserService {
    prismaClient = new PrismaClient();

    async createUser(body: any){
        const { email, password, username } = body

        const user =  await this.prismaClient.user.create({
            data: {
                email,
                password,
                username
            }
        });

        return user
    }
    async deleteUser(id: Number){
        const user = this.getOneUser(id);
        if(user !== null){
            const deletedUser = await this.prismaClient.user.delete({
                where: { id: Number(id) }
            })
            return deletedUser
        }else{
            return null
        }
    }
    async getAllUsers(){
        const users = await this.prismaClient.user.findMany({
            include: {
                characters: true
            }
        })
        return users;
    }
    async getOneUser(id: Number){
        const user = await this.prismaClient.user.findUnique({
            where: { id: Number(id) },
            include: {
                characters: true
            }
        })
        return user;
    }
    async updateUser(body: any, id: Number){
        const { email, password, username, characters } = body

        const updateUser =  await this.prismaClient.user.update({
            where: { id: Number(id) },
            data: {
                email,
                password,
                username,
                characters
            }
        });
        
        return updateUser;
    }
    async patchUser(body: any, id: Number){
        const { email, password, username, characters } = body

        const updateUser =  await this.prismaClient.user.update({
            where: { id: Number(id) },
            data: {
                ...(email && { email }),
                ...(password && { password }),
                ...(username && { username } ),
                ...(characters && { characters })
            }
        });

        return updateUser;
    }


}