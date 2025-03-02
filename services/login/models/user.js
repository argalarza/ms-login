const mysql = require('mysql2');

// Conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    } else {
        console.log('Connected to the database');
    }
});

// Función para obtener usuario por username
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('Database error:', err);  // Imprimir errores de base de datos
                return reject(err);
            }
            console.log('Database results:', results); // Verifica qué datos devuelve la base de datos
            resolve(results.length > 0 ? results[0] : null); // Devuelve el primer usuario o null si no hay resultados
        });
    });
};

module.exports = { getUserByUsername };
