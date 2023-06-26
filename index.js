import { insertLogin, con } from "./Database/db.js";
import { userData } from "./User/user.js";
import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// ====== Rute login ======
app.get('/', (req, res) => {
  res.sendFile('Login/login.html', { root: __dirname });
});

app.get('/login.css', (req, res) => {
  res.sendFile('Login/login.css', { root: __dirname });
});

app.get('/loginWithGoogle.jsx', (req, res) => {
  res.sendFile('Login/loginWithGoogle.jsx', { root: __dirname });
});

app.get('/node_modues/query-string', (req, res) => {
  res.sendFile('/node_modules/query-string', { root: __dirname });
});

// ====== Rute register ======
app.get('/register', (req, res) => {
  res.sendFile('Register/register.html', { root: __dirname });
});

app.get('/register.css', (req, res) => {
  res.sendFile('Register/register.css', { root: __dirname });
});

// ====== Rute adeverinta ======
app.get('/adeverinta.js', function (req, res) {
  res.sendFile(__dirname + '/Adeverinta/adeverinta.js');
});

app.get('/adeverinta.css', function (req, res) {
  res.sendFile(__dirname + '/Adeverinta/adeverinta.css');
});

// Middleware pentru a analiza datele trimise în corpul cererii
app.use(urlencoded({ extended: true }));

// Ascultă pe portul definit
app.listen(port, () => {
  console.log(`Aplicația rulează la adresa http://localhost:${port}`);
});

// Ruta pentru solicitarea adeverinței
app.get('/adeverinta', (req, res) => {
  res.sendFile('Adeverinta/adeverinta.html', { root: __dirname });
});

// Gestionarea inregistrarii
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  insertLogin(email, username, password);
  res.sendFile('Login/login.html', { root: __dirname });
})

// Gestionarea autentificării
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `SELECT * FROM LOGIN WHERE username = '${username}'`;
    const result = await new Promise((resolve, reject) => {
      con.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    if (result.length > 0 && username === result[0].USERNAME && password === result[0].PASSWORD) {
      userData.username = username;
      res.sendFile('Adeverinta/adeverinta.html', { root: __dirname });
    } else {
      fs.readFile('./Login/login.html', 'utf8', (err, data) => {
        if (err) {
          console.error('Error:', err);
          res.send('An error occurred. Please try again.');
          return;
        }

        const modifiedData = data.replace('</body>', '<script>alert("Nume de utilizator sau parola incorecte !");</script></body>');

        res.send(modifiedData);
      });
    }
  } catch (error) {
    res.send("Nume de utilizator sau parola incorecte !");
  }
});



// Gestionarea solicitării adeverinței
app.post('/adeverinta', (req, res) => {
  const { firstName, lastName, studentID, studyYear, academicYear, studyYears, reasonOfIssuing, faculty, studyProgram } = req.body;

  res.send(`Adeverința pentru ${firstName} ${lastName} cu id-ul de student ${studentID} a fost solicitată cu succes!`);
  generateAdeverinta(firstName, lastName, studentID, studyYear, academicYear, studyYears, reasonOfIssuing, faculty, studyProgram).then(() => {
    console.log("Fișierul PDF a fost generat cu succes!");
  })
    .catch((error) => {
      console.log("A apărut o eroare în generarea fișierului PDF:", error);
    });
});

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFileSync, writeFileSync } from "fs";

async function generateAdeverinta(firstName, lastName, studentID, studyYear, academicYear, studyYears, reasonOfIssuing, faculty, profile) {
  const path = ""
  const pdfPath = "./Template-Adeverinta/template-adeverinta-student.pdf"; // Înlocuiește cu calea către șablonul PDF
  const pdfBytes = readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

  page.drawText(firstName + " " + lastName, { x: 143, y: 262, font, size: 12, maxWidth: 130 });
  page.drawText(studyYear, { x: 390, y: 262, font, size: 12 });
  page.drawText(academicYear, { x: 80, y: 241, font, size: 12 });
  page.drawText(studyYears, { x: 498, y: 241, font, size: 12 });
  page.drawText(reasonOfIssuing, { x: 315, y: 198, font, size: 12 });
  page.drawText("ID Student: " + studentID, { x: 450, y: 394, font, size: 12 });
  page.drawText(faculty, { x: 60, y: 375, font, size: 12 });
  page.drawText(profile, { x: 60, y: 330, font, size: 12 });

  const outputPath = "./Adeverinte-Generate/" + firstName + "_" + lastName + "_" + studentID + ".pdf"; // Înlocuiește cu calea dorită pentru fișierul de ieșire PDF
  const pdfBytesModified = await pdfDoc.save();
  writeFileSync(outputPath, pdfBytesModified);
}