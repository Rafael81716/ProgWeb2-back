import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/user', userController.getAllUsers);
userRouter.get('/user/:id', userController.getOneUser);
userRouter.delete('/user/:id', userController.deleteUser);
userRouter.put('/user/:id', userController.updateUser);
userRouter.patch('/user/:id', userController.patchUser);

export { userRouter };