import { Router } from 'express';
import { CharacterController } from '../controllers/CharacterController';

const characterRouter = Router();

const userController = new CharacterController();

characterRouter.post('/character/:id', userController.createCharacter);
characterRouter.get('/user/:userId/character', userController.getAllCharacters);
characterRouter.get('/user/:userId/character/:characterId', userController.getOneCharacter);
characterRouter.delete('/user/:userId/character/:characterId', userController.deleteCharacter);
characterRouter.put('/user/:userId/character/:characterId', userController.updateCharacter);
characterRouter.patch('/user/:userId/character/:characterId', userController.patchCharacter);
characterRouter.get('/admin/', userController.getAllCharactersFromAllUsers);
characterRouter.get('/user/:userId/characters/:name', userController.getCharactersByName);

export { characterRouter };