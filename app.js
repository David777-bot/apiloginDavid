// Configuracion Node.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');// Gestor de Sesiones
const path = require('path');//Gestor de rutas de archivos

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');//Seguridad con variables de entorno
dotenv.config();

//Cargar rutas 
const loginRoutes = require('./src/routes/loginRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const tractorRoutes = require('./src/routes/tractorRoutes');
const implementosRoutes = require('./src/routes/implementosRoutes');
const solicitudRoutes = require('./src/routes/solicitudRoutes');

//Aplicacion
const app = express();

//Motor de plantillas
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));// procesar datos con mas de una capa de profundidad
app.use(bodyParser.json());
app.use(session({
  secret:  process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Endpoints y sus rutas
app.use('/login', loginRoutes);
app.use('/home', homeRoutes);
app.use('/tractor', tractorRoutes);
app.use('/implementos', implementosRoutes);
app.use('/solicitud', solicitudRoutes);

//public (cargar archivos estaticos)
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render('index');
});

// Servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor listo y a la escucha en el puerto: ${PORT}`);
});
