import express, { Request, Response, request } from 'express';
import path from 'path';
import { CreateUserController } from './controllers/user/CreateUserController';
import { CreateCharacterController } from './controllers/character/CreateCharacterController';


const app = express();
const port = 3000;
app.use(express.json());

const createUser = new CreateUserController();
const createCharacter = new CreateCharacterController();

app.post('/user', createUser.handle);
app.post('/character/:id', createCharacter.handle);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});




/*
app.get('/index', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

app.get('/characters', (req: Request, res: Response) => {
  res.json(characters);
});

app.get('/characters/:id', (req: Request, res: Response) => {
  const char = characters.filter((char) => char.id == parseInt(req.params.id));
  if (char) {
    res.json(char);
  } else {
    res.status(404).send('Item not found');
  }
});

app.post('/characters', (req: Request, res: Response) => {
  const {name, classType, level, HP } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  if (!classType) {
    return res.status(400).send('classType is required');
  }
  if (!level) {
    return res.status(400).send('Level is required');
  }
  if (!HP) {
    return res.status(400).send('HP is required');
  }
  const char = { id: currentId++, name, classType, level, HP};
  characters.push(char);
  res.status(201).json(char);
});

app.put('/characters/:id', (req: Request, res: Response) => {
  const index = characters.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
      const {name, classType, level, HP } = req.body;
    if (!name) {
      return res.status(400).send('Name is required');
    }
    if (!classType) {
      return res.status(400).send('classType is required');
    }
    if (!level) {
      return res.status(400).send('Level is required');
    }
    if (!HP) {
      return res.status(400).send('HP is required');
    }
    characters[index] = { id: parseInt(req.params.id), name, classType, level, HP};
    res.json(characters[index]);
  } else {
    res.status(404).send('Character not found');
  }
});

app.delete('/characters/:id', (req: Request, res: Response) => {
  const index = characters.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    characters.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Character not found');
  }
});

app.patch('/characters/:id/HitPoints', (req: Request, res: Response) => {
  const index = characters.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    const { HP } = req.body;
    if (!HP) {
      return res.status(400).send('HitPoints is required');
    }
    characters[index] = { ...characters[index], HP };
    res.json(characters[index]);
  } else {
    res.status(404).send('Character not found');
  }
});
*/
