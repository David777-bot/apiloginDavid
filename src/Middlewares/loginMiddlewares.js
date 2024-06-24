



//CHEQUEO DE TOKEN
exports.checkRol = (requiredRol) => {
    return (req, res, next) => {
        const { rol } = req.user; // Obtener el rol del usuario

        if (rol !== requiredRol) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};
