import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const LoginRouter = Router();

const loginController = new LoginController();

LoginRouter.get('/login', loginController.login);
export { LoginRouter };