const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');



// crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());


// directorio público
app.use( express.static( 'public') );

// Lectura y parseo del body
app.use( express.json() );



// RUTAS
// TODO: auth / crear, login , renew
app.use('/api/auth', require('./routes/auth') );
// TODO: CRUD:Eventos
app.use('/api/events', require('./routes/events') );





// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

