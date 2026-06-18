const mongoose = require('mongoose');
require('dotenv').config();

async function conectarDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("base de datos conectada correctamente :V")
    } catch (error) {
        console.log("Error al conectar a la BD :c");
        process.exit(1);
    }
}

module.exports = conectarDB;