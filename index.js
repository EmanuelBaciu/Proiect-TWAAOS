const express = require('express');
const app = express();
const port = 3000;

// Setare vizualizator EJS pentru a genera pagini HTML
app.set('view engine', 'ejs');

// Rute
app.get('/', (req, res) => {
  res.render('login');
});

// Middleware pentru a analiza datele trimise în corpul cererii
app.use(express.urlencoded({ extended: true }));

// Ascultă pe portul definit
app.listen(port, () => {
  console.log(`Aplicația rulează la adresa http://localhost:${port}`);
});

// Ruta pentru solicitarea adeverinței
app.get('/adeverinta', (req, res) => {
    res.render('adeverinta');
  });

// Gestionarea autentificării
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifică utilizatorul și parola
  // Simulăm o verificare simplă utilizând valori hardcodate
  if (username === ' ' && password === ' ') {
    res.redirect('/adeverinta'); // Redirecționează către pagina de adeverințe
  } else {
    res.send('Nume de utilizator sau parolă incorecte!');
  }
});

// Gestionarea solicitării adeverinței
app.post('/adeverinta', (req, res) => {
    const { nume, prenume, cnp } = req.body;
  
    // Procesează solicitarea și generează adeverința
    // Simulăm un mesaj de succes
    res.send(`Adeverința pentru ${nume} ${prenume} cu CNP-ul ${cnp} a fost solicitată cu succes!`);
  });
