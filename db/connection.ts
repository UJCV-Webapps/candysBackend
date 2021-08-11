import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.DB_NAME || 'candys', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost'
});

export default db;