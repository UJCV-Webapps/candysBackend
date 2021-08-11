import path from 'path';

//Importando configuraciones globales
import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';

//Conexión de la DB
import connection from '../db/connection';

//Funcion para realizar las asociaciones
import { makeAssoc } from './Associations';

//Interfaces
import { Path } from '../interfaces/path';

//Importaciones de routers
import addressRouter from '../routes/address.routes';
import authRouter from '../routes/auth.routes';
import materialRouter from '../routes/material.routes';
import moldTypesRouter from '../routes/moldTypes.routes';
import productRouter from '../routes/product.routes';
import productTypeRouter from '../routes/productType.routes';
import sizeRouter from '../routes/size.routes';

export class Server {
    private app: Application;
    private port = process.env.PORT || '3300';
    private paths: Path[] = [
        {
            url: '/api/auth',
            router: authRouter
        },
        {
            url: '/api/address',
            router: addressRouter
        },
        {
            url: '/api/product',
            router: productRouter
        },
        {
            url: '/api/material',
            router: materialRouter
        },
        {
            url: '/api/productType',
            router: productTypeRouter
        },
        {
            url: '/api/size', 
            router: sizeRouter
        },
        {
            url: '/api/moldType',
            router: moldTypesRouter
        }
    ];
    constructor() {
        this.app = express();

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    //Conectando a la base de datos
    async dbConnection() {
        try {
            await connection.authenticate();
            await makeAssoc();
            console.log('Conectado a la base de datos');
        } catch (error) {
            console.log(error);
        }
    }

    //Configurando middlewares globales
    middlewares() {
        //Habilitando cors
        this.app.use(cors());

        //Habilitado parseo de JSON
        this.app.use(express.json());

        //Definiendo directorio public
        this.app.use(express.static(path.join(__dirname, '..', 'public')));
    }

    //Configurando rutas
    routes() {
        this.paths.forEach(p => {
            this.app.use(p.url, p.router);
        });
    }

    //Habilitando el puerto escucha
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando el puerto: ${this.port}`);
        })
    }

}