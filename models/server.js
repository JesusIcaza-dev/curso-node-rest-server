const express = require('express');
const cors = require('cors');

class Server {
    constructor(){ // en javascript las propiedades de una clase se declaran en el constructor
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // cors
        this.app.use(cors());

        // lectura y parseo del body - transforma cada elemento que reciba en formato json
        this.app.use(express.json());

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
}

module.exports = Server;