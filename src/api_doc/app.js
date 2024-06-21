const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Données temporaires pour les items et les commandes
let items = [
    { id: '1', name: 'Item 1', description: 'Description for Item 1', price: 100 },
    { id: '2', name: 'Item 2', description: 'Description for Item 2', price: 150 }
];

let orders = [
    { id: '1', items: [items[0]], totalPrice: items[0].price },
    { id: '2', items: [items[0], items[1]], totalPrice: items[0].price + items[1].price }
];

// Route pour récupérer toutes les commandes
/**
 * @api {get} /api/items Request all items
 * @apiName GetItems
 * @apiGroup Items
 *
 * @apiSuccess {Object[]} items List of items.
 * @apiSuccess {String} item.id ID of the item.
 * @apiSuccess {String} item.name Name of the item.
 * @apiSuccess {Number} item.price Price of the item.
 */
app.get('/api/items', (req, res) => {
    res.json(items);
});

/**
 * @api {get} /api/items/:id Retrieve an item by ID
 * @apiName GetItem
 * @apiGroup Items
 *
 * @apiParam {String} id ID of the item to retrieve.
 *
 * @apiSuccess {Object} item Item data.
 * @apiSuccess {String} item.id ID of the item.
 * @apiSuccess {String} item.name Name of the item.
 * @apiSuccess {Number} item.price Price of the item.
 *
 * @apiError ItemNotFound The item with the specified ID was not found.
 */
app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(item => item.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

/**
 * @api {post} /api/items Create a new item
 * @apiName CreateItem
 * @apiGroup Items
 *
 * @apiSuccess {String} id Item ID
 * @apiSuccess {String} name Item name
 * @apiSuccess {String} description Item description
 * @apiSuccess {Number} price Item price
 */
app.post('/api/items', (req, res) => {
    const { name, description, price } = req.body;
    const id = (items.length + 1).toString();
    const newItem = { id, name, description, price };
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @api {put} /api/items/:id Update an item by ID
 * @apiName UpdateItem
 * @apiGroup Items
 *
 * @apiParam {String} id Item ID
 *
 * @apiSuccess {String} id Item ID
 * @apiSuccess {String} name Updated item name
 * @apiSuccess {String} description Updated item description
 * @apiSuccess {Number} price Updated item price
 *
 * @apiError ItemNotFound The item was not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Item not found"
 *     }
 */
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        items[itemIndex] = { id, name, description, price };
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Route pour supprimer un item par son ID
/**
 * @api {delete} /api/items/:id Delete an item by ID
 * @apiName DeleteItem
 * @apiGroup Items
 *
 * @apiParam {String} id Item ID
 *
 * @apiSuccess {String} message Success message
 */
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);
    if (items.length < initialLength) {
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Route pour récupérer toutes les commandes
/**
 * @api {get} /api/orders Request all orders
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiSuccess {Object[]} orders List of orders
 * @apiSuccess {String} orders.id Order ID
 * @apiSuccess {Object[]} orders.items List of items in the order
 * @apiSuccess {Number} orders.totalPrice Total price of the order
 */
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Route pour récupérer une commande par son ID
/**
 * @api {get} /api/orders/:id Request an order by ID
 * @apiName GetOrderById
 * @apiGroup Orders
 *
 * @apiParam {String} id Order ID
 *
 * @apiSuccess {String} id Order ID
 * @apiSuccess {Object[]} items List of items in the order
 * @apiSuccess {Number} totalPrice Total price of the order
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "1",
 *       "items": [
 *         {
 *           "id": "1",
 *           "name": "Item 1",
 *           "description": "Description for Item 1",
 *           "price": 100
 *         }
 *       ],
 *       "totalPrice": 100
 *     }
 *
 * @apiError OrderNotFound The order was not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Order not found"
 *     }
 */
app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = orders.find(order => order.id === id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});
app.use('/docs', express.static(path.join(__dirname, '../../apidoc/')));

app.listen(port, () => {
  console.log(`L'api doc est dispo ici : http://localhost:${port}/docs`);
});