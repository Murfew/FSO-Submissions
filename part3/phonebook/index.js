const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let data = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(data);
});

app.get('/info', (request, response) => {
  const count = data.length;
  const time = new Date();
  response.send(
    `<p>Phonebook has info for ${count} people</p>
    <p>${time}</p>`
  );
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = data.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  data = data.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' });
  }

  if (data.filter((person) => person.name.toLowerCase() === body.name.toLowerCase()).length !== 0) {
    return response.status(400).json({ error: 'name already exists in phonebook' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000000),
  };

  data = data.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
