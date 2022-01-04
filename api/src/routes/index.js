const { Router } = require('express');
const pokemonRoute = require('./pokemonRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', pokemonRoute);


module.exports = router;
