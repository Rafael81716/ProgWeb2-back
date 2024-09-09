import { PrismaClient, Spell } from '@prisma/client';
import { UserService } from './../services/UserService';
import { mockDeep } from 'jest-mock-extended'; 

// Mock do Prisma Client
const prismaMock = mockDeep<PrismaClient>();

describe('UserService', () => {
  let userService: UserService;

  beforeAll(() => {
    // Inicializa o UserService e pega o prisma mockado
    userService = new UserService();
    userService.prismaClient = prismaMock;
  });

  describe('createUser', () => {
    it('should create a new user with given data', async () => {
      const body = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      };

      const mockUser = { ...body, id: 1, characters: [], isAdmin: false };

      // Mock da resposta do Prisma
      prismaMock.user.create.mockResolvedValue(mockUser);

      const user = await userService.createUser(body);

      expect(user).toEqual(mockUser);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: body,
        include: { characters: true },
      });
    });
  });
  describe('delete User', () => {
    it('should delete a user if found', async () => {
    const id = 1;
    const spellLevelMock = {
        spells: [{ id }] as Spell[],
        id: id,
        usedSpells: 0,
        totalSpells: 0,
    }
    const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        isAdmin: false,
        username: 'testuser',
        characters: [
            {  
                id: 1,
                name: "Nozit",
                playerName: "Rafael",
                class: "Ladino",
                level: 1,
                attributeId: id,
                savingThrowId: id,
                abilityCheckId: id,
                background: "Outlander",
                race: "Elfo negro",
                attributes: {
                    id: 1,
                    strengthValue: 10,
                    strengthMod: 0,
                    dexterityValue: 14,
                    dexterityMod: 2,
                    constitutionValue: 12,
                    constitutionMod: 1,
                    intelligenceValue: 8,
                    intelligenceMod: -1,
                    wisdomValue: 16,
                    wisdomMod: 3,
                    charismaValue: 18,
                    charismaMod: 4,
                },
                armorClass: 10,
                initiative: 3,
                failCounter: 0,
                successCounter: 0,
                speed: 30,
                hitPointsActual: 10,
                hitPointsMax: 15,
                alignment: "good Lawful",
                lifeDie: "1d8",
                totalLifeDie: "5d8",
                XP: 1000,
                bonds: "family",
                inspiration: true,
                proficiencyBonus: 2,
                temporaryHitPoints: 0,
                weapons: [],
                inventory: [],
                spellLevel0Id: id,
                spellLevel1Id: id,
                spellLevel2Id: id,
                spellLevel3Id: id,
                spellLevel4Id: id,
                spellLevel5Id: id,
                spellLevel6Id: id,
                spellLevel7Id: id,
                spellLevel8Id: id,
                spellLevel9Id: id,
                spellLevel0: spellLevelMock,
                spellLevel1: spellLevelMock,
                spellLevel2: spellLevelMock,
                spellLevel3: spellLevelMock,
                spellLevel4: spellLevelMock,
                spellLevel5: spellLevelMock,
                spellLevel6: spellLevelMock,
                spellLevel7: spellLevelMock,
                spellLevel8: spellLevelMock,
                spellLevel9: spellLevelMock,
                history: "História do Personagem",
                notes: "Notas Adicionais",
                abilityCheck: {
                    id,
                    acrobatics: 2,
                    animalHandling: 2,
                    arcana: 2,
                    athletics: 2,
                    deception: 2,
                    history: 2,
                    insight: 2,
                    intidimation: 2,
                    investigation: 2,
                    medicine: 2,
                    nature: 2,
                    perception: 2,
                    perfomance: 2,
                    persuasion: 2,
                    religion: 2,
                    sleightOfHand: 2,
                    stealth: 2,
                    survival: 2,
                },
                savingThrows: {
                    id,
                    strengthMod: 0,
                    dexterityMod: 2,
                    constitutionMod: 1,
                    intelligenceMod: -1,
                    wisdomMod: 5,
                    charismaMod: 6,
                },
                personalityTrait: "",
                ideals: "",
                weakness: "",
                talents: "",
                proficiency: "",
                conjurerClass: "",
                conjurerAttribute: "",
                spellCD: 0,
                spellAttackModifier: 0,
                photo: "",
                userId: id
            },
          ],
    };

    // Mock da resposta do getOneUser (usuário encontrado)
    jest.spyOn(userService, 'getOneUser').mockResolvedValue(mockUser);

    // Mock da resposta do Prisma para delete
    prismaMock.user.delete.mockResolvedValue(mockUser);

    const deletedUser = await userService.deleteUser(id);

    // Verificações
    expect(deletedUser).toEqual(mockUser);
    expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: Number(id) },
        include: { characters: {
            include: {
              abilityCheck: true,
              attributes: true,
              inventory: true,
              savingThrows: true,
              spellLevel0: { include: { spells: true } },
              spellLevel1: { include: { spells: true } },
              spellLevel2: { include: { spells: true } },
              spellLevel3: { include: { spells: true } },
              spellLevel4: { include: { spells: true } },
              spellLevel5: { include: { spells: true } },
              spellLevel6: { include: { spells: true } },
              spellLevel7: { include: { spells: true } },
              spellLevel8: { include: { spells: true } },
              spellLevel9: { include: { spells: true } },
              weapons: true,
            },
          },
         },
    });
    });
  });
});
