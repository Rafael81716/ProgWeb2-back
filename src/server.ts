import express, { Request, Response } from 'express';
import path from 'path';


const app = express();
const port = 3000;
const characters = [
  {
    id: 1,
    name: 'John Doe',
    class: 'Fighter',
    Level: 1,
    HP: 20
  }, {
    id: 2,
    name: 'Mariano Doe',
    class: 'Paladin',
    Level: 5,
    HP: 50
  },
  {
    id: 3,
    name: 'Jonas Doe',
    class: 'wizard',
    Level: 10,
    HP: 90
  }
]

app.use(express.json());

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

app.get('/characters', (req: Request, res: Response) => {
  res.send(characters);
});

app.get('/characters/1', (req: Request, res: Response) => {
  res.send(characters.filter((char) => char.id == 1));
});

app.post('/characters', (req: Request, res: Response) => {
  res.send('Requisição Post a homePage');
});

app.put('/characters/1', (req: Request, res: Response) => {
  res.send('Requisição Post a homePage');
});

app.delete('/characters/1', (req: Request, res: Response) => {
  res.send('Requisição Post a homePage');
});

app.patch('/characters/1/HitPoints', (req: Request, res: Response) => {
  res.send('Requisição Post a homePage');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});





