const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const db = require('./database');
const path = require('path');
const app = express();

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Middleware to check if user is admin
function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 1) {
    return res.redirect('/login');
  }
  next();
}

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-very-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 }
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// --- ROUTES ---

// Home Route
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

// Department Route (protected)
app.get('/department/:name', requireLogin, (req, res) => {
  const department = req.params.name;
  db.all('SELECT * FROM papers WHERE department = ?', [department], (err, papers) => {
    if (err) console.log(err);
    res.render('department', { department, papers, user: req.session.user });
  });
});

// Login Routes
app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.redirect('/login');
    }
    
    req.session.user = user;
    req.session.save(err => {
      if (err) console.log('Session Save Error:', err);
      res.redirect('/');
    });
  });
});

// Registration Route
app.get('/register', (req, res) => res.render('register'));

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  db.run('INSERT INTO users (username, password, role) VALUES (?, ?, 0)', 
    [username, hashedPassword], 
    function(err) {
      if (err) {
        console.log('Registration Error:', err);
        return res.redirect('/register');
      }
      
      db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, user) => {
        if (err || !user) return res.redirect('/register');
        
        req.session.user = user;
        req.session.save(err => {
          if (err) console.log('Session Save Error:', err);
          res.redirect('/');
        });
      });
    }
  );
});

// Departments API route
app.get('/api/departments', (req, res) => {
  const departments = [
    { id: 'ISE', name: 'Information Science and Engineering' },
    { id: 'CSE', name: 'Computer Science and Engineering' },
    { id: 'EEE', name: 'Electrical and Electronics Engineering' },
    { id: 'CyberSecurity', name: 'Cyber Security' }
  ];
  res.json(departments);
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log('Logout error:', err);
    res.redirect('/');
  });
});

// Upload Routes - Protected for Admin only
app.get('/upload', requireAdmin, (req, res) => {
  res.render('upload', { user: req.session.user });
});

app.post('/upload', requireAdmin, upload.single('file'), (req, res) => {
  const { name, department, year, subject, type } = req.body;
  
  if (!req.file) {
    return res.redirect('/upload');
  }

  db.run(
    'INSERT INTO papers (name, department, year, subject, type, file_path, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, department, year, subject, type, req.file.filename, req.session.user.id],
    (err) => {
      if (err) {
        console.log('Upload error:', err);
        return res.redirect(`/department/${department}`);
      }
      res.redirect(`/department/${department}`);
    }
  );
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));