const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token || ''; // Obtener el token de las cookies o de donde sea que lo envíes

    // Verificar si existe el token
    if (!token) {
        return res.redirect('/login'); // Redirigir a la página de login si no está autenticado
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, 'tu_clave_secreta');

        // Guardar el usuario decodificado en el objeto de solicitud para su uso posterior
        req.user = decoded;

        // Continuar con la siguiente función de middleware
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.redirect('/login'); // Redirigir a la página de login si el token es inválido
    }
};
