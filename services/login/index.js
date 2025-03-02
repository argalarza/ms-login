const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { loginUser } = require('./controllers/logincontroller');  // Asegúrate de que el nombre del archivo sea 'loginController.js' y que la ruta sea correcta
const app = express();
const PORT = 3000;

app.use(cors());  // Permite solicitudes de otros dominios
app.use(express.json()); // Habilita el parsing de JSON

// Ruta de login (ENDPOINT)
app.post('/login', loginUser);

app.listen(PORT, () => {
  console.log(`Login service running on port ${PORT}`);
});
