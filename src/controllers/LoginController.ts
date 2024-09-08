import { Request, Response } from 'express'
import { UserService } from '../services/UserService';
import jsonwebtoken from "jsonwebtoken";

export class LoginController{
    async login(request: Request, response: Response){
        const [, hash] = request.headers.authorization?.split(' ')  || [' ', ' '];
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
        const userService = new UserService();
        try{
            const userList = await userService.getAllUsers()
            const userInfo = userList.find((user) => user.email === email && user.password === password)
            console.log(userInfo)
            if(!userInfo) return response.status(401).send('Senha ou Email incorreto!');
            
            const token = jsonwebtoken.sign(
                { user: JSON.stringify(userInfo) },
                process.env.JWT_SECRET_KEY??'',
                { expiresIn: '60m' }
            );

            return response.status(200).json({data: { userInfo, token }})
        }catch(error){
            console.log(error);
            return response.send(error)
        }
    }
}
export async function tokenValidated(
    request: Request, 
    response: Response,
    next: any
){
    const userService = new UserService();
    const userList = await userService.getAllUsers()
    const userInfo = userList.find((user) => {user.email === request.body.email && user.password === request.body.password})
    const [, token] = request.headers.authorization?.split(' ') || [' ', ' ']
    if(!token) return response.status(401).send('Acesso negado. Token não dado')

        try{
            const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY??'');
            const userIdFromToken = typeof payload !== 'string' && payload.user;

            if(!userInfo && !userIdFromToken){
                return response.send(401).json({ message: 'Invalid Token' });
            }

            request.headers['user'] = (payload as any)?.user;

            return next();
        }catch(error){
            console.log(error);
            return response.status(401).json({ message: 'Invalid Token' })
        }
}
