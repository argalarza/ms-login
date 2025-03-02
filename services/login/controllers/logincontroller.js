const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../models/user');  // Asegúrate de que la ruta sea correcta

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log('Received username:', username);  // Para verificar el valor recibido

  try {
    // Buscar al usuario por su nombre de usuario
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Comparar las contraseñas directamente (sin cifrado)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,  // Asegúrate de que JWT_SECRET esté configurado en tu archivo .env
      { expiresIn: '1h' }  // El token expirará en una hora
    );

    // Enviar la respuesta con el token
    res.json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
