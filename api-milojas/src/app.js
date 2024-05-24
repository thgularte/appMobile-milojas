const express = require('express');
const cors = require('cors');
const pino = require('pino-http');
const ORM = require('./orm/sequelize');
const v1_router = require('./routes/router');

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        const DATABASE_URL = process.env.DATABASE_URL;
        if (DATABASE_URL) {
            this.orm = new ORM(DATABASE_URL);
        }
    }

    middlewares() {
        this.server.use(express.json({ limit: "50mb" }));
        this.server.use(cors());
        this.server.use(pino({ level: "info", timestamp: true, enabled: true }));
    }

    routes() {
        this.server.use('/v1', v1_router);
    }

    
}
module.exports = App;
