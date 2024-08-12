import { PrismaClient } from "@prisma/client";

export class CharacterService {
    prismaClient = new PrismaClient();

    async createCharacter(body: any, id: Number){
        const { 
            name,
            charClass,
            level,
            background,
            race,
            attributes,
            armorClass,
            initiative,
            failCounter,
            successCounter,
            speed,
            hitPoints,
            weapons,
            inventory,
            spellCasting,
            history,
            notes,
            abilityCheck,
            savingThrows
        } = body


        const user = await this.prismaClient.user.findUnique({
            where: { id: Number(id) }
        })
        if(user !== null){
            const user =  await this.prismaClient.user.update({
                where: { id: Number(id) },
                data: {
                    characters: {
                        create : {
                            name,
                            class: charClass,
                            level,
                            background,
                            race,
                            attributes: {
                                create: attributes
                            },
                            armorClass,
                            initiative,
                            failCounter,
                            successCounter,
                            speed,
                            hitPoints,
                            weapons: {
                                create: weapons
                            },
                            inventory: {
                                create: inventory
                            },
                            spellCasting: {
                                create: spellCasting
                            },
                            history,
                            notes,
                            abilityCheck: {
                                create: abilityCheck
                            },
                            savingThrows: {
                                create: savingThrows
                            }
                        }
                    },
                }
            });
            return user;
        }else{
            return null;
        }
    }
    /*
    async deleteUser(id: Number){
        const deletedUser = await this.prismaClient.user.delete({
            where: { id: Number(id) }
        })

        return deletedUser;
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
    */
}