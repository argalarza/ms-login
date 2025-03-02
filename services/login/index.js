const express = require('express');
const cors = require('cors');
const { loginUser } = require('./controllers/logincontroller');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta de login
app.post('/login', loginUser);

app.listen(PORT, () => {
  console.log(`Login service running on port ${PORT}`);
});
