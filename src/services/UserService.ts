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
            }, 
            include: {
                characters: true
            }
        });

        return user
    }
    async deleteUser(id: number){
        const user = this.getOneUser(id );
        if(user !== null){
            const deletedUser = await this.prismaClient.user.delete({
                where: { id: Number(id) },
                include: {
                    characters: true
                }
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
    async getOneUser(id: number){
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            include: {
                characters: { 
                    include: {
                        abilityCheck: true,
                        attributes: true,
                        inventory: true,
                        savingThrows: true,
                        spellLevel0: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel1: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel2: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel3: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel4: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel5: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel6: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel7: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel8: {
                            include: {
                                spells: true,
                            }
                        },
                        spellLevel9: {
                            include: {
                                spells: true,
                            }
                        },
                        user: false,
                        weapons: true
                    }
                }
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
            }, 
            include: {
                characters: true
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
            }, 
            include: {
                characters: true
            }
        });

        return updateUser;
    }


}