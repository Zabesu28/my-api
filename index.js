const express = require('express');
const app = express();
const port = 3000;
const { swaggerUi, specs } = require('./swagger');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api:
 *   get:
 *     tags: [Api Test]
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server démarré sur http://localhost:${port}`);
    console.log(`Swagger UI est dispo sur http://localhost:${port}/api-docs`);
});

const characters = [
    { id: 1, name: 'Noah' },
    { id: 2, name: 'Mio' },
    { id: 3, name: 'Eunie' },
    { id: 4, name: 'Taion' }
]

/**
 * @swagger
 * /api/characters:
 *   get:
 *     tags: [Character]
 *     summary: Retrieve a list of characters
 *     responses:
 *       200:
 *         description: A list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/api/characters', (req, res) => {
    res.json(characters);
});

// Exemple d'endpoint avec documentation Swagger
/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     tags: [Character]
 *     summary: Retrieve an character by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to retrieve
 *     responses:
 *       200:
 *         description: The requested item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Item not found
 */
app.get('/api/characters/:id', (req, res) => {
    const { id } = req.params;
    const chara = characters.find(item => item.id == id);
    if (chara) {
        res.json(chara);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});