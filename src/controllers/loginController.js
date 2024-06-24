const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.getLogin = (req, res) => {
    res.render('login');
};


exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
      // Buscar al usuario por nombre de usuario en la base de datos
        User.usuarioSearch(username, (err, result) => {
            if (err) {
                console.error('Error al buscar usuario:', err);
                return res.redirect('/login');
            }

            if (result.length === 0) {
                // Usuario no encontrado
                return res.redirect('/login');
            }

        const user = result[0];

        if (user.clave !== password) {
              // Contraseña incorrecta
            return res.redirect('/login');
        }

          // Autenticación exitosa
          // Generar token JWT
        const token = jwt.sign({ username: user.usuario, rol: user.rol }, process.env.SECRET_KEY, { expiresIn: '1h' });

          // Enviar el token como cookie o en la respuesta, según tu aplicación
          // Aquí se muestra un ejemplo de cómo enviarlo como cookie
        res.cookie('token', token, { httpOnly: true });

          // Redirigir a la página de solicitud de préstamo después de iniciar sesión correctamente
        res.redirect('/home');
        });
    } catch (error) {
        console.error('Error al autenticar al usuario:', error);
      res.redirect('/login'); // Manejar errores de manera adecuada en tu aplicación
    }
};