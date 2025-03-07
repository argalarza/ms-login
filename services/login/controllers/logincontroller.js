const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const { getUserByUsername } = require('../models/user'); 
const loginUser = async (req, res) => {
  const { username, password, captcha } = req.body;

  // Verificar el CAPTCHA utilizando la clave secreta
  const secretKey = '6LeXYOwqAAAAAGezd7O1xeTe45n0TGiUcWngeqqF'; // Clave secreta obtenida de Google

  try {
    // Verificar el reCAPTCHA con la API de Google
    const captchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: captcha, // El valor que recibimos desde el front-end
        },
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: 'CAPTCHA no válido' });
    }

    // Buscar al usuario por su nombre de usuario
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { loginUser };
