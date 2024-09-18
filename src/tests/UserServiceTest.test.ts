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
    it('should return null if user is not found', async () => {
      
      const id = 900;

      prismaMock.user.update.mockRejectedValue(new Error('RecordNotFound'));

      try {
          await userService.deleteUser(id);
      } catch (error) {
          // Verifica se o erro retornado é o esperado
          let errorValue = error as Error;
          expect(errorValue).toBeInstanceOf(Error);
          expect(errorValue.message).toBe('RecordNotFound');
      }
    })
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
          include: { 
              characters: true
          },
      });
    });
  });
  describe('get All Users in database', () => {
      it('should return all users with their characters and nested properties', async () => {
        // Mock de exemplo de usuários e personagens aninhados
        const mockUsers = [
          {
            id: 1,
            email: 'user1@example.com',
            username: 'user1',
            password: "123456",
            isAdmin: false,
            characters: [
              {
                id: 1,
                name: "Nozit",
                playerName: "Rafael",
                class: "Ladino",
                level: 1,
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
                spellLevel0: { spells: [] },
                spellLevel1: { spells: [] },
                spellLevel2: { spells: [] },
                spellLevel3: { spells: [] },
                spellLevel4: { spells: [] },
                spellLevel5: { spells: [] },
                spellLevel6: { spells: [] },
                spellLevel7: { spells: [] },
                spellLevel8: { spells: [] },
                spellLevel9: { spells: [] },
                abilityCheck: {
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
                  strengthMod: 0,
                  dexterityMod: 2,
                  constitutionMod: 1,
                  intelligenceMod: -1,
                  wisdomMod: 5,
                  charismaMod: 6,
                },
              },
            ],
          },
          {
            id: 2,
            email: 'user1@example.com',
            username: 'user1',
            password: "123456",
            isAdmin: false,
            characters: [
              {
                id: 2,
                name: "Nozit",
                playerName: "Rafael",
                class: "Ladino",
                level: 1,
                background: "Outlander",
                race: "Elfo negro",
                attributes: {
                  id: 2,
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
                spellLevel0: { spells: [] },
                spellLevel1: { spells: [] },
                spellLevel2: { spells: [] },
                spellLevel3: { spells: [] },
                spellLevel4: { spells: [] },
                spellLevel5: { spells: [] },
                spellLevel6: { spells: [] },
                spellLevel7: { spells: [] },
                spellLevel8: { spells: [] },
                spellLevel9: { spells: [] },
                abilityCheck: {
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
                  strengthMod: 0,
                  dexterityMod: 2,
                  constitutionMod: 1,
                  intelligenceMod: -1,
                  wisdomMod: 5,
                  charismaMod: 6,
                },
              },
            ],
          }
        ];

        // Mock da resposta do Prisma para findMany
        prismaMock.user.findMany.mockResolvedValue(mockUsers);

        const users = await userService.getAllUsers();

        // Verificações
        expect(users).toEqual(mockUsers);
        expect(users.length).toEqual(mockUsers.length)
        expect(prismaMock.user.findMany).toHaveBeenCalledWith({
          include: {
            characters: true,
          },
        });
      })
      it('should return a empty array if there is no user', async () => {
        // Mock de exemplo de usuários e personagens aninhados

        // Mock da resposta do Prisma para findMany
        prismaMock.user.findMany.mockResolvedValue([]);

        const users = await userService.getAllUsers();

        // Verificações
        expect(users).toEqual([]);
        expect(users.length).toEqual(0)
        expect(prismaMock.user.findMany).toHaveBeenCalledWith({
          include: {
            characters: true,
          },
        });
      })
  });
  describe('Get One user in database', () => {
    it('should return the user based on id',async () => {
      // Mock de exemplo de usuários e personagens aninhados
      const id = 1;
      const spellLevelMock1 = {
          spells: [{ id }] as Spell[],
          id: id,
          usedSpells: 0,
          totalSpells: 0,
      }
      const mockUser1 = {
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
                  spellLevel0: spellLevelMock1,
                  spellLevel1: spellLevelMock1,
                  spellLevel2: spellLevelMock1,
                  spellLevel3: spellLevelMock1,
                  spellLevel4: spellLevelMock1,
                  spellLevel5: spellLevelMock1,
                  spellLevel6: spellLevelMock1,
                  spellLevel7: spellLevelMock1,
                  spellLevel8: spellLevelMock1,
                  spellLevel9: spellLevelMock1,
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

      prismaMock.user.findUnique.mockResolvedValue(mockUser1);
      
      const user = await userService.getOneUser(id);
      expect(user).toEqual(mockUser1);

      jest.resetAllMocks();
    })
    it('should return null with unvalid id', async () => {
        // Mock de exemplo de um ID inválido
      const invalidId = 999;

      // Mock para simular que o usuário não foi encontrado
      prismaMock.user.findUnique.mockResolvedValue(null);

      // Chamada do serviço
      const user = (await userService.getOneUser(invalidId))?"":null;

      // Verificações
      expect(user).toBeNull(); // Esperamos que o retorno seja null
    })
  });
  describe('Update all information of a character', () => {
    it('should update all information about a user',async () => {
      const id = 1;
      const spellLevelMock1 = {
          spells: [{ id }] as Spell[],
          id: id,
          usedSpells: 0,
          totalSpells: 0,
      }
      const body = {
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
                  spellLevel0: spellLevelMock1,
                  spellLevel1: spellLevelMock1,
                  spellLevel2: spellLevelMock1,
                  spellLevel3: spellLevelMock1,
                  spellLevel4: spellLevelMock1,
                  spellLevel5: spellLevelMock1,
                  spellLevel6: spellLevelMock1,
                  spellLevel7: spellLevelMock1,
                  spellLevel8: spellLevelMock1,
                  spellLevel9: spellLevelMock1,
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
      const mockUpdatedUser = {
        id: 1,
        email: 'test1@example.com',
        password: '1234567',
        isAdmin: false,
        username: 'testuser1',
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
                spellLevel0: spellLevelMock1,
                spellLevel1: spellLevelMock1,
                spellLevel2: spellLevelMock1,
                spellLevel3: spellLevelMock1,
                spellLevel4: spellLevelMock1,
                spellLevel5: spellLevelMock1,
                spellLevel6: spellLevelMock1,
                spellLevel7: spellLevelMock1,
                spellLevel8: spellLevelMock1,
                spellLevel9: spellLevelMock1,
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
    prismaMock.user.update.mockResolvedValue(mockUpdatedUser);
    const updatedUser = await userService.updateUser(body, id);

    expect(updatedUser).toEqual(mockUpdatedUser);
    expect(updatedUser.password).toEqual('1234567');

    jest.resetAllMocks();
    })
    it('should return null if user id does not exist', async () => {
      const id = 999;
      const spellLevelMock1 = {
        spells: [{ id }] as Spell[],
        id: id,
        usedSpells: 0,
        totalSpells: 0,
    }
      const body = {
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
                spellLevel0: spellLevelMock1,
                spellLevel1: spellLevelMock1,
                spellLevel2: spellLevelMock1,
                spellLevel3: spellLevelMock1,
                spellLevel4: spellLevelMock1,
                spellLevel5: spellLevelMock1,
                spellLevel6: spellLevelMock1,
                spellLevel7: spellLevelMock1,
                spellLevel8: spellLevelMock1,
                spellLevel9: spellLevelMock1,
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
      // Simula o erro "RecordNotFound" do Prisma
    prismaMock.user.update.mockRejectedValue(new Error('RecordNotFound'));

    try {
        await userService.updateUser(body, id);
    } catch (error) {
        // Verifica se o erro retornado é o esperado
        let errorValue = error as Error;
        expect(errorValue).toBeInstanceOf(Error);
        expect(errorValue.message).toBe('RecordNotFound');
    }
    })
  });
  describe('Update some information of a character', () => {
    it('should update some information about a user',async () => {
      const id = 1;
      const spellLevelMock1 = {
          spells: [{ id }] as Spell[],
          id: id,
          usedSpells: 0,
          totalSpells: 0,
      }
      const mockUpdatedUser = {
        id: id,
        email: 'test1@example.com',
        password: '1234567',
        isAdmin: false,
        username: 'testuser1',
        characters: [
            {  
                id: id,
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
                    id: id,
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
                spellLevel0: spellLevelMock1,
                spellLevel1: spellLevelMock1,
                spellLevel2: spellLevelMock1,
                spellLevel3: spellLevelMock1,
                spellLevel4: spellLevelMock1,
                spellLevel5: spellLevelMock1,
                spellLevel6: spellLevelMock1,
                spellLevel7: spellLevelMock1,
                spellLevel8: spellLevelMock1,
                spellLevel9: spellLevelMock1,
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
      const body = {
      email: 'test12@example.com',
      password: '1234569',
      isAdmin: false,
      username: 'testuser9',
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
              spellLevel0: spellLevelMock1,
              spellLevel1: spellLevelMock1,
              spellLevel2: spellLevelMock1,
              spellLevel3: spellLevelMock1,
              spellLevel4: spellLevelMock1,
              spellLevel5: spellLevelMock1,
              spellLevel6: spellLevelMock1,
              spellLevel7: spellLevelMock1,
              spellLevel8: spellLevelMock1,
              spellLevel9: spellLevelMock1,
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
      prismaMock.user.update.mockResolvedValue(mockUpdatedUser);
      const updatedUser = await userService.patchUser(body, id);
      expect(updatedUser).toEqual(mockUpdatedUser);
      expect(updatedUser.password).toEqual('1234567')
      expect(updatedUser.email).toEqual('test1@example.com') 
      expect(updatedUser.username).toEqual('testuser1') 
    
      jest.resetAllMocks();
    })

    it('should return null if user id does not exist', async () => {
      const id = 999;
      const spellLevelMock1 = {
        spells: [{ id }] as Spell[],
        id: id,
        usedSpells: 0,
        totalSpells: 0,
    }
      const body = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        isAdmin: false,
        username: 'testuser',
    };
      // Simula o erro "RecordNotFound" do Prisma
    prismaMock.user.update.mockRejectedValue(new Error('RecordNotFound'));

    try {
        await userService.updateUser(body, id);
    } catch (error) {
        // Verifica se o erro retornado é o esperado
        let errorValue = error as Error;
        expect(errorValue).toBeInstanceOf(Error);
        expect(errorValue.message).toBe('RecordNotFound');
    }
    })
  })
});
