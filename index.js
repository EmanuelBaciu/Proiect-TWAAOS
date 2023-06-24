const express = require('express');
const app = express();
const port = 3000;

// ====== Rute login ======
app.get('/', (req, res) => {
  res.sendFile('Login/login.html',{root: __dirname });
});

app.get('/login.css', (req, res) => {
  res.sendFile('Login/login.css',{root: __dirname });
});

// ====== Rute adeverinta ======
app.get('/adeverinta.js', function(req, res){
  res.sendFile(__dirname + '/Adeverinta/adeverinta.js');
});

app.get('/adeverinta.css', function(req, res){
  res.sendFile(__dirname + '/Adeverinta/adeverinta.css');
});

// Middleware pentru a analiza datele trimise în corpul cererii
app.use(express.urlencoded({ extended: true }));

// Ascultă pe portul definit
app.listen(port, () => {
  console.log(`Aplicația rulează la adresa http://localhost:${port}`);
});

// Ruta pentru solicitarea adeverinței
app.get('/adeverinta', (req, res) => {
  res.sendFile('Adeverinta/adeverinta.html',{root: __dirname });
  });

// Gestionarea autentificării
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifică utilizatorul și parola
  if (username === ' ' && password === ' ') {
    res.redirect('/adeverinta');
  } else {
    res.send('Nume de utilizator sau parolă incorecte!');
  }
});

// Gestionarea solicitării adeverinței
app.post('/adeverinta', (req, res) => {
    const { firstName, lastName, studentID, studyYear, academicYear, studyYears, reasonOfIssuing } = req.body;
    
    res.send(`Adeverința pentru ${firstName} ${lastName} cu id-ul de student ${studentID} a fost solicitată cu succes!`);
    generateAdeverinta(firstName, lastName, studentID, studyYear, academicYear, studyYears, reasonOfIssuing, "fara facultate").then(() => {
      console.log("Fișierul PDF a fost generat cu succes!");
    })
    .catch((error) => {
      console.log("A apărut o eroare în generarea fișierului PDF:", error);
    });
  });

  const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");

async function generateAdeverinta(firstName, lastName, studentID, studyYear, academicYear, studyYears, reasonOfIssuing, faculty) {
  const path = ""
  const pdfPath = "./Template-Adeverinta/template-adeverinta-student.pdf"; // Înlocuiește cu calea către șablonul PDF
  const pdfBytes = fs.readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

  page.drawText(firstName + " " + lastName, { x: 143, y: 262, font, size: 12, maxWidth: 130 });
  page.drawText(studyYear, { x: 390, y: 262, font, size: 12 });
  page.drawText(academicYear, { x: 50, y: 241, font, size: 12 });
  page.drawText(studyYears, { x: 498, y: 241, font, size: 12 });
  page.drawText(reasonOfIssuing, { x: 315, y: 198, font, size: 12 });
  page.drawText(studentID, { x: 100, y: 60, font, size: 12 });
  page.drawText(faculty, { x: 100, y: 40, font, size: 12 });

  const outputPath = "./Adeverinte-Generate/" + firstName + "_" + lastName + "_" + studentID + ".pdf"; // Înlocuiește cu calea dorită pentru fișierul de ieșire PDF
  const pdfBytesModified = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytesModified);
}