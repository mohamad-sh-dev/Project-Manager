/* eslint-disable no-undef */
const { allRoutes } = require('./router/router');

module.exports = class Application {
    
    #express = require('express');
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configDataBase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }

    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({
            extended: true 
        }));
        // eslint-disable-next-line no-undef
        this.#app.use(this.#express.static(path.join(__dirname, '..' , 'public')))
    }

    configDataBase(DB_URL) {
        const mongoose = require('mongoose');
        mongoose.connect(DB_URL, (err) => {
            if (!err) console.log('Database Connected Successfully...');
            else {
                console.log(`Database Connection Error : ${err}`);
                // eslint-disable-next-line no-undef
                process.exit(1);
            }
        })
    }
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Started On Port ${PORT} => http://localhost:${PORT}`);
        })
    }
    createRoutes() {
        this.#app.get('/', (req, res) => {
            return res.status(200).json({
                status: 'success',
                message: 'hello from projectManager'
            })
        })
        this.#app.use(allRoutes)
    }
    errorHandler() {
        this.#app.use((req, res) => {
            return res.status(404).json({
                status: 'fail',
                message: 'request not found'
            })
        })
         // eslint-disable-next-line no-unused-vars
         this.#app.use((error, req, res , next) => {
            console.log(error);
            const status = error.statusCode || 500;
            const message = error.message || 'InternalServerError';
            return res.status(status).json({
                status: 'fail',
                message
            })
        })
    }
}