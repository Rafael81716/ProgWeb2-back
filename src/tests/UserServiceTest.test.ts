import { PrismaClient } from '@prisma/client';
import { beforeEach } from 'node:test';
import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { UserService } from '../services/UserService';

const prismaClient = new PrismaClient();
const userService = new UserService();

beforeAll(async () => {
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("User Service Tests", () => {
    describe("User Service Post Test", async () => {
        let user: { email: string; password: string; username: string; } ;
        beforeEach(async () => {
            user = {
                email: "teste@gmail.com",
                password: "123456",
                username: "Player1"
            }
        })
        test("a test is created succesfully", async () => {
            const newUser = await userService.createUser(user);

            expect(newUser).toHaveProperty('id')
            expect(newUser.email).toEqual(user.email)
            expect(newUser.password).toEqual(user.password)
            expect(newUser.username).toEqual(user.username)
            expect(newUser).toHaveProperty('characters')
        })
    })
})