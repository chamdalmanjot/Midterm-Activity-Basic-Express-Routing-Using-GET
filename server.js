// Name: Manjot Chamdal
// Course: WD-303

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// index: false lets the app.get('/') route below handle "/" and log it.
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// ---------- Page routes ----------
function sendPage(res, file) {
  console.log(`Rendering ${file}`);
  res.sendFile(path.join(__dirname, 'public', file));
}

app.get('/', (req, res) => sendPage(res, 'index.html'));
app.get('/menu', (req, res) => sendPage(res, 'menu.html'));
app.get('/about', (req, res) => sendPage(res, 'about.html'));
app.get('/contact', (req, res) => sendPage(res, 'contact.html'));

// ---------- Menu data ----------
const products = [
  { id: 1, name: 'Espresso',          category: 'coffee', price: 95,  image: '/images/espresso.jpg' },
  { id: 2, name: 'Latte',             category: 'coffee', price: 110, image: '/images/latte.jpg', note: '₱10.00 off!' },
  { id: 3, name: 'Cappuccino',        category: 'coffee', price: 120, image: '/images/cappuccino.jpg' },
  { id: 4, name: 'Americano',         category: 'coffee', price: 110, image: '/images/americano.jpg' },
  { id: 5, name: 'Decaf Coffee',      category: 'coffee', price: 200, image: '/images/decaf.jpg' },
  { id: 6, name: 'Chocolate Coffee',  category: 'coffee', price: 135, image: '/images/chocolate-coffee.jpg' },
  { id: 7, name: 'Blueberry Muffin',  category: 'pastry', price: 75,  image: '/images/blueberry-muffin.jpg' },
  { id: 8, name: 'Chocolate Croissant', category: 'pastry', price: 80, image: '/images/chocolate-croissant.jpg' }
];

// GET /api/menu                  
// GET /api/menu?category=pastry  
app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  const result = category
    ? products.filter(p => p.category === category.toLowerCase())
    : products;
  res.json(result);
});

// GET /api/menu/2 -> one product by id (req.params)
app.get('/api/menu/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: `No product with id ${req.params.id}` });
  }
  res.json(product);
});

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});