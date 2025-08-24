const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, email });
  });
});

app.get('/api/posts', (req, res) => {
  db.all(`
    SELECT posts.*, users.name as author_name 
    FROM posts 
    LEFT JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content, user_id } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  db.run('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', 
    [title, content, user_id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, title, content, user_id });
  });
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>RadioCalico Prototype</title></head>
      <body>
        <h1>RadioCalico Local Server</h1>
        <p>Server is running on port ${PORT}</p>
        <h2>API Endpoints:</h2>
        <ul>
          <li>GET /api/users - Get all users</li>
          <li>POST /api/users - Create a user</li>
          <li>GET /api/posts - Get all posts</li>
          <li>POST /api/posts - Create a post</li>
        </ul>
      </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server accessible at http://0.0.0.0:${PORT}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});